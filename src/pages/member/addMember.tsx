import {
    Alert,
    Autocomplete,
    Backdrop,
    Button,
    Checkbox,
    CircularProgress,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
  import Notification from "../../components/common/Notification";
import { DepartmentModel } from "../../features/department/departmentModel";
import { getAll } from "../../features/department/departmentSlice";
  import {
    handleChangeData,
    add,
    findById,
    updateById,
  } from "../../features/member/membersSlice";
import { MemberType } from "../../features/member/memberType.enum";
  import { Role } from "../../utils/enum/role.enum";
  import Strings from "../../utils/Strings";
  
  function AddMember() {
    // ------------------------------------------------------------------------------- //
    // take state from props
    const [notify, setNotify] = React.useState({
      isOpen: false,
      message: "",
      type: "",
    });
    // ----------------------------------------------------------------------------------- //
    // get param from user url
    const { id } = useParams();
    // ----------------------------------------------------------------------------------- //
    // dispatch to get and executer function from slices
    const dispatch = useDispatch<AppDispatch>();
    // ----------------------------------------------------------------------------------- //
    // use to navigate to another components
    const navigate = useNavigate();
    // ----------------------------------------------------------------------------------- //
    // desctruct memebers from user state [ userSlice]
    const { singleMember, isError, isSucces, isLoading, message, processDone } = useSelector(
      (state: any) => state.members
    );
    // ----------------------------------------------------------------------------------- //
    const { Departments } = useSelector(
      (state: any) => state.departments
    );
    // ----------------------------------------------------------------------------------- //
    const [department , setDepartment] = React.useState(1)
    // handle submit form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (id === undefined) {
        dispatch(add({memberData : singleMember, depId : department}));
      } else {
        // update user by id
        dispatch(updateById({memberData : singleMember, depId : department}));
        // ----------------------------------------------------------------------- //
      }
    };
    // ----------------------------------------------------------------------------------- //
  
    // -------------------------------------------------------------- //
    // get user data from id passed when register init
    useEffect(() => {
      // get all department 
      // ----------------------------------------------------------------------- //
      // TODO fix update
      // git user by id
      if (id != undefined) {
        console.log(singleMember);
        dispatch(findById(Number(id)));
      }
      // ----------------------------------------------------------------------- //
    }, [dispatch, processDone]);
    // ====================================================================================================== //
  
    // -------------------------------------------------------------- //
    if (isLoading) {
      return (
        <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      )
    }
    return (
      <>
        
        {isError ? <Alert severity="error" >{Array.isArray(message) ?  message[0] : message}</Alert> : null}
        
  
        <CssBaseline />
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {id != undefined ? Strings.edit + Strings.members : Strings.add + Strings.members }
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label={Strings.fullName}
                  value={singleMember["fullName"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled>
                <InputLabel id="demo-simple-select-label">
                  {Strings.departments}
                </InputLabel>
                <Select
                  name="department"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // id != undefined ? singleMember.department.id :
                  value={singleMember.department.id} 
                  label={Strings.departments}
                >
                  
                   <MenuItem key={singleMember.department.id} value={singleMember.department.id}>{singleMember.department.dep_name}</MenuItem>
                </Select>
              </FormControl>
                </Grid>
                <Grid item xs={12}>
              <FormControl fullWidth disabled>
                <InputLabel id="demo-simple-select-label">
                  {Strings.memberType}
                </InputLabel>
                <Select
                  name="memberType"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    singleMember["memberType"] == MemberType.Teacher ? MemberType.Teacher : MemberType.Student
                  }
                  label={Strings.permission}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <MenuItem value={MemberType.Student}>{Strings.student}</MenuItem>
                  <MenuItem value={MemberType.Teacher}>{Strings.teacher}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={Strings.email}
                  name="email"
                  value={singleMember["email"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  // hidden
                  fullWidth
                  id="username"
                  label={Strings.userName}
                  name="username"
                  value={singleMember["username"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label={Strings.city}
                  value={singleMember["city"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label={Strings.phone}
                  value={singleMember["phone"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  name="phone"
                  autoComplete="family-name"
                />
              </Grid>

              
              
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={Strings.password}
                  value={singleMember["password"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
  
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {id != undefined ? Strings.edit : Strings.add}
            </Button>
          </Box>
        </Box>
  
        <Notification notify={notify} setNotify={setNotify} />
      </>
    );
    // ====================================================================================================== //
  }
  
  export default AddMember;
  