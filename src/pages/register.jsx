import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nik, setNik] = useState("");
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleNikChange = (e) => {
    setNik(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, nik: "" })); // Clear NIK error when the user starts typing
  };

  const handleNameChange = (e) => {
    setNama(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, name: "" })); // Clear Name error when the user starts typing
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear Email error when the user starts typing
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" })); // Clear Phone Number error when the user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" })); // Clear Password error when the user starts typing
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" })); // Clear Confirm Password error when the user starts typing
  };

  const validate = () => {
    let errors = {};

    // Validasi NIK
    if (!nik) {
      errors.nik = "NIK harus diisi.";
    } else if (!/^\d{16}$/.test(nik)) {
      errors.nik = "NIK harus terdiri dari 16 angka.";
    }

    // Validasi Nama Lengkap
    if (!name) {
      errors.name = "Nama lengkap harus diisi.";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.name = "Nama hanya boleh terdiri dari huruf dan spasi.";
    }

    // Validasi Email
    if (!email) {
      errors.email = "Email harus diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Format email tidak valid.";
    }

    // Validasi Nomor Telepon
    if (!phoneNumber) {
      errors.phoneNumber = "Nomor telepon harus diisi.";
    } else if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Nomor telepon hanya boleh terdiri dari angka.";
    }

    // Validasi Password
    if (!password) {
      errors.password = "Password harus diisi.";
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.password =
        "Password terdiri minimal 8 karakter, 1 huruf kapital dan 1 angka.";
    }

    // Validasi Konfirmasi Password
    if (!confirmPassword) {
      errors.confirmPassword = "Konfirmasi password harus diisi.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Konfirmasi password tidak sesuai.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      let data = {
        nik,
        name,
        email,
        phoneNumber,
        password,
      };
      dispatch(register(data, navigate, toast));
      setLoading(true);
    } else {
      toast.error("Perhatikan data Anda");
    }
  };

  return (
    <div className="flex bg-white min-h-screen ">
      {/* Sisi Kiri  */}
      <div className="lg:w-2/5 lg:px-16 max-sm:px-5 md:px-40 md:pt-7 flex flex-col justify-center">
        <div className="m-4">
          <img
            src="/img/logo.svg"
            className="w-[70%]"
            onClick={(e) => {
              navigate("/");
            }}
          />
          <div className="mt-3 mb-3 flex flex-col gap-2">
            <p className="text-red-600 text-3xl">
              <strong>Selamat Datang,</strong>
            </p>
            <p className="text-3xl">
              <strong>Peserta Ujian Psikotes</strong>
            </p>
            <p className="text-sm">
              Silahkan daftarkan diri anda sebelum mengerjakan ujian psikotes
            </p>
          </div>
          <form
            action=""
            className="flex flex-col gap-2 mt-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className={`bordered p-2 rounded-md border ${
                errors.nik ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="NIK"
              value={nik}
              onChange={handleNikChange}
            />
            {errors.nik && (
              <span className="text-red-500 text-sm mt-[-8px]">
                {errors.nik}
              </span>
            )}

            <input
              type="text"
              className={`bordered p-2 rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nama Lengkap"
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-[-8px]">
                {errors.name}
              </span>
            )}

            <input
              type="email"
              className={`bordered p-2 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-[-8px]">
                {errors.email}
              </span>
            )}

            <input
              type="text"
              className={`bordered p-2 rounded-md border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nomor Telepon"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm mt-[-8px]">
                {errors.phoneNumber}
              </span>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full p-2 rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300"
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
              <div className="absolute -bottom-6 max-lg:-bottom-10 text-red-500 text-sm">
                {" "}
                {errors.password && <span>{errors.password}</span>}
              </div>
            </div>

            <div
              className={`relative ${
                errors.password ? "mt-5 max-lg:mt-10" : ""
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full p-2 rounded-xl border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 bottom-0 flex items-center px-3"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? (
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
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`bg-red-600 w-full py-2 mt-4 text-white rounded-xl
              hover:bg-red-700 ${errors.password ? "mt-8" : ""}`}
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
                "Daftar"
              )}
            </button>
          </form>

          <div className="flex flex-col items-center gap-2 py-2 justify-center">
            <button
              className="text-blue-600 hover:text-blue-700"
              onClick={() => navigate("/login")}
            >
              Masuk ke akun Anda
            </button>
          </div>
        </div>
      </div>
      {/* Sisi Kanan  */}
      <div className="flex justify-start max-lg:hidden w-3/5">
        <img src="/img/bg_red.jpg" className="h-full" />
      </div>
    </div>
  );
}

export default Register;
