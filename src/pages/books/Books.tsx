import { Add } from "@mui/icons-material";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/table";
import { MemberModel } from "../../features/member/membersModel";
import {
  deleteById,
  findById,
  getAll,
  resetSingle
} from "../../features/books/booksSlice";
import Strings from "../../utils/Strings";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { DeleteRounded, RemoveRedEye } from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { BookModel, BooksModel } from "../../features/books/booksModel";
import { AppDispatch } from "../../app/store";
import { BookColumns } from "../../components/models/columns";


function Books() {
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
  const { books, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.books
  );

  const { member } = useSelector((state: any) => state.auth);

  let data: BooksModel[] = books as BooksModel[];
  
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
      headerName: '',
      width: 120,
      renderCell: (params: any) => {
        return (
          <Box className="cellAction" sx={{ margin: "auto" }}>
            {/* <Box
              component={"a"}
              sx={{
                textDecoration: "none",
                display: "inline-block",
                marginRight: 2,
                marginLeft: 2,
              }}
              target={"_blank"}
              href={
                params.row.bookFilePath != null
                  ? `${Strings.API_URL}book/upload/view/${params.row.id}`
                  : `#`
              }
            >
              <Avatar
                key={params.row.id}
                alt={Strings.bookImage}
                sx={{ width: 30, height: 30 }}
                src={
                  params.row.bookFilePath != null
                    ? `${Strings.API_URL}book/upload/view/${params.row.id}`
                    : `#`
                }
              />
            </Box> */}
            <Link 
              to={`/book/${params.row.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => {dispatch(findById(Number(params.row.id)))}}

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
            {Strings.books}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="">
          {/* <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{
              maring: 16,
              textAlign: "end",
              float: "right",
            }}
            onClick={() => {
              dispatch(resetSingle());
              navigate("/book");
            }}
          >
            {Strings.add + Strings.book}
          </Button> */}
        </Grid>
      </Grid>
      {data?.length > 0 ? (
        <DataTable row={BookColumns} data={data} action={[]} />
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

export default Books;
