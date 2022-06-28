import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/table";
import { BarrowModel } from "../../features/barrows/barrowsModel";
import {
  deleteById,
  findById,
  getAll,
  reset,
  resetSingle,
} from "../../features/barrows/barrowsSlice";
import Strings from "../../utils/Strings";
import { BarrowsColumns } from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { DeleteRounded, RemoveRedEye } from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { AppDispatch } from "../../app/store";


function Barrows() {
  const navigate = useNavigate();
  // ---------------------------------------------------------------------------------- //
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  // ---------------------------------------------------------------------------------- //

  const dispatch = useDispatch<AppDispatch>();
  const { barrows, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.barrows
  );

  const { member } = useSelector((state: any) => state.auth);

  let barrowData: BarrowModel[] = barrows as BarrowModel[];
    
  useEffect(() => {
    if (member) {
      dispatch(getAll());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  // ---------------------------------------------------------------------------------- //
  const handleDelete = (id: number) => {
    // TODO delete from members fix delete member
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteById(id));
  };
  // ---------------------------------------------------------------------------------- //
  // handle action [delete and view]
  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params: any) => {
        return (
          <Box className="cellAction">
            <Link
              to={`/barrow/${params.row.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(findById(Number(params.row.id)))}
            >
              <RemoveRedEye
                sx={{ color: green[500], marginRight: 2, marginLeft: 2 }}
              ></RemoveRedEye>
            </Link>

            <DeleteRounded
              className="deleteButton"
              sx={{ color: red[500] }}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: Strings.areYouSureToDelete,
                  subTitle: Strings.youCantUndoThisStep,
                  onConfirm: () => {
                    handleDelete(params.row.id);
                  },
                });
              }}
            >
              {Strings.delete}
            </DeleteRounded>
          </Box>
        );
      },
    },
  ];
  // ---------------------------------------------------------------------------------- //
  return (
    // check of array of member has item then return table
    <>
      <Grid
        container
        justifyContent="space-between"
        justifyItems="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ margin: 1 }}>
            {Strings.barrows}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="" >
          <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{
              maring: 16,
              textAlign : 'end',
              float : 'right'
            }}
            onClick={() => {
              dispatch(resetSingle());
              navigate("/barrow");
            }}
          >
            {Strings.add + Strings.addBarrow}
          </Button>
        </Grid>
      </Grid>

      {barrowData?.length > 0 ? (
        <DataTable
          row={BarrowsColumns}
          data={barrowData}
          action={actionColumn}
        />
      ) : (
        <div>No data returned</div>
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default Barrows;
