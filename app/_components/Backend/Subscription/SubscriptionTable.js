import { useFlash } from "@/app/_context/FlashContext";
import useCancelSubscription from "@/app/_hooks/useCancelSubscription";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function SubscriptionTable({ items, user }) {
  const { state, dispatch } = useFlash();
  const { cancelUserSubscription, loading: loadingCancel } =
    useCancelSubscription();
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const sortedItems = items
    .map((item) => ({
      ...item,
      endsAtDate: item.endsAt ? new Date(item.endsAt.seconds * 1000) : null,
    }))
    .sort((a, b) => {
      const statusComparison = a.status.localeCompare(b.status);
      if (statusComparison !== 0) return statusComparison;

      return (b.endsAtDate || new Date()) - (a.endsAtDate || new Date());
    });

  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCancelSubscription = (item) => {
    setShowCancelConfirmation(true);
    setSelectedItem(item);
  };

  const handleCancel = async (subscriptionId) => {
    try {
      const userData = await cancelUserSubscription(subscriptionId);
      if (userData) {
        toast.success("Subscription canceled successfully");
      }
      dispatch({ type: "SET_FBUSER", payload: userData });
      window.location.reload();
    } catch (error) {
      toast.error(
        error.message || "An error occurred while canceling the subscription."
      );
    } finally {
      setShowCancelConfirmation(false);
    }
  };

  return (
    <>
      {/* <Title>Categories</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Plan Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Order ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Status</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Expires in</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Typography variant="h5" padding={6}>
                  No Subscriptions Available.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sortedItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontSize: "16px" }}>
                      {item.plan}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontSize: "16px" }}>
                      ${item.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontSize: "16px" }}>
                      {item.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        textTransform: "capitalize",
                        color: item.status == "active" ? "#51BC51" : "red",
                      }}
                    >
                      {item.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontSize: "16px" }}>
                      {item.endsAtDate
                        ? format(item.endsAtDate, "MMMM dd, yyyy")
                        : "Lifetime Access"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.status == "active" && item.plan != "Basic" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancelSubscription(item)}
                        disabled={loadingCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Cancellation Confirmation Modal */}
      <Dialog
        open={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
      >
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your subscription? You’ll keep your
            perks until the end of your current billing period. After that, your
            subscription will end, and access to premium features will be
            removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowCancelConfirmation(false)}
            variant="outlined"
            disabled={loadingCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCancel(selectedItem.id)}
            color="error"
            variant="contained"
            disabled={loadingCancel}
          >
            {loadingCancel ? "Processing..." : "Cancel Subscription"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SubscriptionTable;
