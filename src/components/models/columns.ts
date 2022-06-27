import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { BookStateType } from "../../features/books/bookType";
import { MemberType } from "../../features/member/memberType.enum";
import { MemberModel } from "../../features/member/membersModel";
import { ReportState, ReportStateArabic, ReportType, ReportTypeArabic } from "../../utils/enum/reporttype";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";


  
  export const MembersColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70 },
    {
      field: 'fullName',
      headerName: Strings.fullName,
      width: 200
    },
    {
      field: 'dep_name',
      headerName: Strings.dep_name,
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.department.dep_name }`,
    },
    // { field: 'username', headerName: Strings.userName.toString(), width: 120 },
    { field: 'email', headerName: Strings.email.toString(), width: 200 },
    { field: 'isActive', headerName: Strings.isActive.toString(), width: 130 , 
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isActive ? 'مفعل' : 'غير مفعل'}`,
  },
    { field: 'memberType', headerName: Strings.memberType.toString(), width: 130 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.memberType == MemberType.Teacher ? Strings.teacher : Strings.student}`,
  },
  ];
    

  export const BookColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70 },
    {
      field: 'bookName',
      headerName: Strings.bookName,
      width: 100
    },
    {
      field: 'bookPublishDate',
      headerName: Strings.bookPublishDate,
      width: 100
    },
    {
      field: 'author',
      headerName: Strings.authorName,
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.author.full_name}`,
    },
    {
      field: 'bookPages',
      headerName: Strings.bookPages,
      width: 80
    },
    // {
    //   field: 'bookCount',
    //   headerName: Strings.bookCount,
    //   width: 80
    // },
    {
      field: 'isbn',
      headerName: Strings.isbn,
      width: 80
    },
    {
      field: 'bookPublisher',
      headerName: Strings.bookPublisher,
      width: 150
    },
    {
      field: 'bookDescription',
      headerName: Strings.bookDescription,
      width: 200
    },
    { field: 'state', headerName: Strings.state.toString(), width: 80 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.state == BookStateType.STAYED ? Strings.stayed : Strings.barrowed}`,
  },
  ];

  // Barrows Column
  
  export const BarrowsColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70 },
    { field: 'fullName', headerName: Strings.barrow.toString(), width: 200 , 
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.member.fullName}`,
  },
    { field: 'bookName', headerName: Strings.bookName.toString(), width: 130 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.book.bookName}`,
  },
  
  { field: 'returnDate', headerName: Strings.returnDate, width: 100 },
  ];