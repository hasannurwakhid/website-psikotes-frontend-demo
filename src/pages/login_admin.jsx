import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { login, loginadmin } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Login() {
  const [nip, setNip] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [nipError, setNipError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleNipChange = (e) => {
    setNip(e.target.value);
    setNipError(""); // Clear NIK error when the user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear password error when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!nip || nip.trim() === "") {
      setNipError("NIP tidak boleh kosong");
      hasError = true;
    }

    if (!password || password.trim() === "") {
      setPasswordError("Password tidak boleh kosong");
      hasError = true;
    }
    if (hasError) return;

    let data = {
      nip,
      password,
    };
    setLoading(true); // Mulai loading
    await dispatch(loginadmin(data, navigate));
    setLoading(false); // Selesai loading
  };

  return (
    <div className="flex bg-white h-screen">
      {/* Sisi Kiri  */}
      <div className="w-[720px]  lg:px-16 max-sm:px-5 md:px-40 md:pt-7 flex flex-col justify-center">
        <div className="m-4">
          <img
            src="\img\logo.svg"
            className="sm:w-[70%]"
            onClick={(e) => {
              navigate("/");
            }}
          />
          <div className="">
            <div className="mt-4 mb-6 flex flex-col gap-2 ">
              <p className="text-red-600 text-3xl">
                <strong>Selamat Datang,</strong>
              </p>
              <p className="text-3xl">
                <strong>Admin Ujian Psikotes</strong>
              </p>
              <p className="text-sm">
                Silahkan masuk ke akun anda untuk mendapatkan akses Admin ujian
                psikotes
              </p>
            </div>
            <form action="" className="flex flex-col gap-4 sm:mt-5">
              <input
                type="text"
                className={`p-2 rounded-md border ${
                  nipError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="NIP"
                value={nip}
                onChange={handleNipChange}
              />
              {nipError && (
                <p className="text-red-500 text-sm mt-[-10px]">{nipError}</p>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full p-2 rounded-md border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 bottom-0 flex items-center px-3"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <svg
                      fill="black"
                      className="w-4 hover:fill-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                    </svg>
                  ) : (
                    <svg
                      fill="black"
                      className="w-4 hover:fill-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                    </svg>
                  )}
                </button>
                <div className="absolute -bottom-6 text-red-500 text-sm">
                  {passwordError && <p>{passwordError}</p>}
                </div>
              </div>
            </form>

            <div
              className={`flex flex-col items-center gap-3 justify-center my-4 ${
                passwordError ? "mt-5" : ""
              }`}
            >
              <button
                className={`bg-red-600 w-full py-2 mt-5 text-white rounded-xl hover:bg-red-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 4V1M12 1v3m0 16v3M12 22v-3M6.293 6.293L4.879 4.879M4.879 4.879l1.414 1.414M18.364 18.364l1.414 1.414M19.778 19.778l-1.414-1.414M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                    </svg>
                  </div>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Sisi Kanan  */}
      <div className="flex justify-start max-lg:hidden">
        <img src="/img/bg_red.jpg" className="h-full" />
      </div>
    </div>
  );
}

export default Login;
