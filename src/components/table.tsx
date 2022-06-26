import * as React from "react";
import { DataGrid, GridColDef, GridEditModes, GridValueGetterParams } from "@mui/x-data-grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  DeleteForeverOutlined,
  DeleteForeverRounded,
  DeleteOutlineRounded,
  DeleteRounded,
  RemoveRedEye,
} from "@mui/icons-material";
import Strings from "../utils/Strings";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { DepartmentModel } from "../features/department/departmentModel";
import { MemberModel } from "../features/member/membersModel";
import { BookModel } from "../features/books/booksModel";
import { BarrowModel } from "../features/barrows/barrowsModel";
// import { CitizensModel } from "../features/citizens/citizensModel";
// import { PolicOfficeModel } from "../features/police_officess/policeOfficesModel";
// import { AboutModel } from "../features/about/aboutModel";
// import { ReportsModel } from "../features/reports/reportsModel";

interface Props {
  data: DepartmentModel[] | MemberModel[] | BookModel[] | BarrowModel[];
  row : GridColDef[];
  action : any;
}

export default function DataTable({  row, data, action }: Props) {
  const dispatch = useDispatch();
  // TODO fix navigate when user delete



  
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          autoPageSize={true}
          rows={data}
          columns={row.concat(action)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          editMode={GridEditModes.Row}
          // checkboxSelection
        />
      </div>


    </>
  );
}
