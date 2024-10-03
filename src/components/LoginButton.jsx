import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { showToast } from "./Toast";

const LoginButton = ({ email, password, setUser, disabled = false }) => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    Swal.fire({
      //scrollbarPadding: false,
      title: "Logging in...",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      axios
        .post("https://comex-server.vercel.app/api/login", { email, password })
        .then((response) => {
          const { token, user, message } = response.data;
          if (response.status === 200) {

            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userUsertype", user.usertype);

            setUser({ email, token }); // Update user context

            const successMessages = {
              "Successfully logged in as Admin": "/admin/dashboard",
              "Successfully logged in as Student": "/client/home",
              "Successfully logged in as NTP": "/client/home",
              "Successfully logged in as Comex Coordinator": "/client/home",
              "Successfully logged in as Faculty": "/client/home",
            };

            const path = successMessages[message];

            if (path) {
              showToast("success", "Logged in!");
              navigate(path);
            } else {
              Swal.fire({
                scrollbarPadding: false,
                icon: "error",
                title: message, 
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Something went wrong";
          Swal.fire({
            scrollbarPadding: false,
            icon: "error",
            title: errorMessage, 
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  return (
    <button
      onClick={handleLogin}
      disabled={disabled}
      className={`btn w-full font-semibold rounded-md px-3 py-1.5 text-lg leading-6 shadow-sm ${
        disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-nucolor3 text-nucolor4 hover:bg-lightyellow hover:text-white3"
      }`}
    >
      Log In
    </button>
  );
};

export default LoginButton;