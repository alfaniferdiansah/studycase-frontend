import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setOrder } from "../../redux/actions/userAction";
import axios from "../../axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectAuth, selectOrder, selectUser } from "../../redux/userSelector";
import { AiOutlineArrowRight, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { MdTrackChanges } from "react-icons/md";
import { Country, State } from "country-state-city";

const ProfileContent = ({ active }) => {
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    axios
      .patch(`/user/${user._id}`, {
        name,
        username,
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
        toast.success("your update is success, please sign in again!!");
        dispatch(setAuth(false));
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Cann't proccess your update!!");
      });
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <FaUserCircle size={100} />
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Username</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Password</label>
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  />
                </div>
                  {visible ? (
                    <AiOutlineEyeInvisible
                      className="flex right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="flex right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* TrackOrder */}
      {active === 3 && (
        <div>
          <TrackOrders />
        </div>
      )}

      {/*  user Address */}
      {active === 4 && (
        <div>
          tes
          
          {/* <Address /> */}
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    axios.get(`/order/${user._id}`)
      .then(function (response) {
        dispatch(setOrder(response.data.data));
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const totalPrice = data.reduce((accumulator, product) => accumulator + (product.price * product.qty), 0);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length + " items",
        total: totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/order/${user._id}`)
      .then(function (response) {
        console.log(response);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.cart[0].price,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

// const Address = () => {
//   const [open, setOpen] = useState(false);
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [zipCode, setZipCode] = useState();
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [addressType, setAddressType] = useState("");
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const addressTypeData = [
//     {
//       name: "Default",
//     },
//     {
//       name: "Home",
//     },
//     {
//       name: "Office",
//     },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (addressType === "" || provinsi === "" || kabupaten === "") {
//       toast.error("Please fill all the fields!");
//     } else {
//       dispatch(
//         updatUserAddress(
//           country,
//           city,
//           address1,
//           address2,
//           zipCode,
//           addressType
//         )
//       );
//       setOpen(false);
//       setCountry("");
//       setCity("");
//       setAddress1("");
//       setAddress2("");
//       setZipCode(null);
//       setAddressType("");
//     }
//   };

//   const handleDelete = (item) => {
//     const id = item._id;
//     dispatch(deleteUserAddress(id));
//   };

//   return (
//     <div className="w-full px-5">
//       {open && (
//         <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
//           <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
//             <div className="w-full flex justify-end p-3">
//               <RxCross1
//                 size={30}
//                 className="cursor-pointer"
//                 onClick={() => setOpen(false)}
//               />
//             </div>
//             <h1 className="text-center text-[25px] font-Poppins">
//               Add New Address
//             </h1>
//             <div className="w-full">
//               <form aria-required onSubmit={handleSubmit} className="w-full">
//                 <div className="w-full block p-4">
//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Country</label>
//                     <select
//                       name=""
//                       id=""
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         choose your country
//                       </option>
//                       {Country &&
//                         Country.getAllCountries().map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.isoCode}
//                             value={item.isoCode}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Choose your City</label>
//                     <select
//                       name=""
//                       id=""
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         choose your city
//                       </option>
//                       {State &&
//                         State.getStatesOfCountry(country).map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.isoCode}
//                             value={item.isoCode}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address 1</label>
//                     <input
//                       type="address"
//                       className={`${styles.input}`}
//                       required
//                       value={address1}
//                       onChange={(e) => setAddress1(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address 2</label>
//                     <input
//                       type="address"
//                       className={`${styles.input}`}
//                       required
//                       value={address2}
//                       onChange={(e) => setAddress2(e.target.value)}
//                     />
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Zip Code</label>
//                     <input
//                       type="number"
//                       className={`${styles.input}`}
//                       required
//                       value={zipCode}
//                       onChange={(e) => setZipCode(e.target.value)}
//                     />
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address Type</label>
//                     <select
//                       name=""
//                       id=""
//                       value={addressType}
//                       onChange={(e) => setAddressType(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         Choose your Address Type
//                       </option>
//                       {addressTypeData &&
//                         addressTypeData.map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.name}
//                             value={item.name}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className=" w-full pb-2">
//                     <input
//                       type="submit"
//                       className={`${styles.input} mt-5 cursor-pointer`}
//                       required
//                       readOnly
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex w-full items-center justify-between">
//         <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
//           My Addresses
//         </h1>
//         <div
//           className={`${styles.button} !rounded-md`}
//           onClick={() => setOpen(true)}
//         >
//           <span className="text-[#fff]">Add New</span>
//         </div>
//       </div>
//       <br />
//       {user &&
//         user.addresses.map((item, index) => (
//           <div
//             className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
//             key={index}
//           >
//             <div className="flex items-center">
//               <h5 className="pl-5 font-[600]">{item.addressType}</h5>
//             </div>
//             <div className="pl-8 flex items-center">
//               <h6 className="text-[12px] 800px:text-[unset]">
//                 {item.address1} {item.address2}
//               </h6>
//             </div>
//             <div className="pl-8 flex items-center">
//               <h6 className="text-[12px] 800px:text-[unset]">
//                 {user && user.phoneNumber}
//               </h6>
//             </div>
//             <div className="min-w-[10%] flex items-center justify-between pl-8">
//               <AiOutlineDelete
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => handleDelete(item)}
//               />
//             </div>
//           </div>
//         ))}

//       {user && user.addresses.length === 0 && (
//         <h5 className="text-center pt-8 text-[18px]">
//           You not have any saved address!
//         </h5>
//       )}
//     </div>
//   );
// };

export default ProfileContent;
