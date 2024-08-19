import {
  addProSubscription,
  cancelSubscription,
  getActivePremiumSubscription,
  getSubscriptionByUserId,
  updateSubscription,
} from "@/app/_lib/data-service";
import {
  generateUniqueId,
  getCardLimitBasedOnPlan,
  getQuantityBasedOnPlan,
} from "@/app/_util/utilities";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook Error: " + err.message },
      { status: 400 }
    );
  }

  let customerId;
  let subscription;
  let user;

  switch (event.type) {
    case "invoice.payment_succeeded":
      const invoice = event.data.object;
      customerId = invoice.customer;

      if (invoice.subscription) {
        subscription = await stripe.subscriptions.retrieve(
          invoice.subscription
        );
        user = JSON.parse(subscription.metadata.user);

        const subscriptionDetails = {
          userId: user.userId,
          status: subscription.status,
          plan: "Premium",
          endsAt: new Date(subscription.current_period_end * 1000),
          id: subscription.id,
          price: subscription.items.data[0]?.price?.unit_amount / 100 || 0,
          stripeCustomerId: customerId,
          cardLimit: getCardLimitBasedOnPlan("Premium"),
          quantity: getQuantityBasedOnPlan("Premium"),
        };

        // Add or update the subscription in your database
        await addProSubscription(user.userId, subscriptionDetails);
      } else {
        console.error(
          "Invoice does not have an associated subscription:",
          invoice
        );
      }
      break;

    case "customer.subscription.deleted":
      const canceledSubscription = event.data.object;
      const canceledUser = JSON.parse(canceledSubscription.metadata.user);

      const activePremiumSubscription = await getActivePremiumSubscription(
        canceledUser.userId
      );

      if (activePremiumSubscription) {
        await cancelSubscription(activePremiumSubscription.id, "canceled");
      }

      const existingBasicSubscription = await getSubscriptionByUserId(
        canceledUser.userId
      );

      if (existingBasicSubscription) {
        const updatedSubscription = {
          status: "active",
          plan: "Basic",
          endsAt: null,
          price: "0.00",
          cardLimit: getCardLimitBasedOnPlan("Basic"),
          quantity: getQuantityBasedOnPlan("Basic"),
        };

        await updateSubscription(
          canceledUser.userId,
          existingBasicSubscription.id,
          updatedSubscription
        );
      } else {
        console.error(
          "No existing subscription found for user:",
          canceledUser.userId
        );
      }
      break;

    case "invoice.payment_failed":
      const failedPayment = event.data.object;
      const failedUser = JSON.parse(failedPayment.metadata.user);

      const activeFailedPremiumSubscription =
        await getActivePremiumSubscription(failedUser.userId);

      if (activeFailedPremiumSubscription) {
        await cancelSubscription(activePremiumSubscription.id, "expired");
      }

      const existingExpiredBasicSubscription = await getSubscriptionByUserId(
        failedUser.userId
      );

      if (existingExpiredBasicSubscription) {
        const updatedSubscription = {
          status: "active",
          plan: "Basic",
          endsAt: null,
          price: "0.00",
          cardLimit: getCardLimitBasedOnPlan("Basic"),
          quantity: getQuantityBasedOnPlan("Basic"),
        };

        await updateSubscription(
          failedUser.userId,
          existingExpiredBasicSubscription.id,
          updatedSubscription
        );
      } else {
        console.error(
          "No existing subscription found for user:",
          canceledUser.userId
        );
      }
      break;

    default:
      `Unhandled event type ${event.type}`;
  }

  return NextResponse.json({ received: true });
}
