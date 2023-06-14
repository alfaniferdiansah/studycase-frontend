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

export default ProfileContent;
