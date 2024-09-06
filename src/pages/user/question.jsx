import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "@fortawesome/fontawesome-free/js/all.js";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, setQuestions } from "../../redux/reducers/questReducers";
import {
  answerQuestion,
  getPesertaQuestion,
  submitTest,
} from "../../redux/actions/questAction";
import { toast } from "react-toastify";

function Question() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State untuk modal konfirmasi
  const user = useSelector((state) => state.auth.user);
  const answer = useSelector((state) => state.question.answers || {});
  const [selectedAnswers, setselectedAnswers] = useState(answer || {});
  const [selectedmultipleChoiceId, setSelectedmultipleChoiceId] =
    useState(null);
  const [imageBased, setimageBased] = useState(true);
  const [loading, setLoading] = useState(false);
  const [indexOption, setindexOption] = useState(0);
  const [index, setindex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalQuest, setShowModalQuest] = useState(false); // Modal Quest Mobile
  const timer = useSelector(
    (state) => state?.question?.timer?.remainingTime || []
  );
  const [timeLeft, setTimeLeft] = useState(timer);
  const question = useSelector((state) => state.question);
  const questions = useSelector((state) => state.question.question || []);
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    questions.length > 0 ? questions[0].id : null
  ); // Default ke soal pertama
  const options =
    questions.length > 0 && questions[indexOption]?.MultipleChoices
      ? questions[indexOption].MultipleChoices
      : [];

  const submittedAnswer = useSelector(
    (state) => state.question.submittedAnswer || []
  );

  useEffect(() => {
    setLoading(true);
    console.log("submittedAnswerPage", submittedAnswer);
    if (!token) {
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 1000);
      toast.error("Anda belum memiliki akses, silakan login.");
    }
    if (user.isDone === true) {
      navigate("/");
      window.location.reload();
      return;
    }
    dispatch(getPesertaQuestion(navigate));
    setLoading(false);
  }, []);

  // Validasi apakah questions sudah tersedia sebelum setSelectedQuestionId
  useEffect(() => {
    if (questions.length > 0) {
      setSelectedQuestionId(questions[0].id); // Set ID pertanyaan pertama jika ada data
    }
  }, [questions]);

  const handleQuestionClick = (id, index) => {
    setindexOption(index);
    setSelectedQuestionId(id);
  };

  // Function to populate selectedAnswers from initial response data
  const initializeSelectedAnswers = () => {
    const initialSelectedAnswers = {};

    questions.forEach((question) => {
      const selectedChoice = question.MultipleChoices?.find(
        (choice) => choice.AnswerHistories && choice.AnswerHistories.length > 0
      );

      if (selectedChoice) {
        initialSelectedAnswers[question.id] = selectedChoice.id;
      }
    });

    setselectedAnswers(initialSelectedAnswers);
    dispatch(setAnswer(initialSelectedAnswers));
  };

  useEffect(() => {
    // Call the function on component mount
    if (questions.length > 0) {
      initializeSelectedAnswers();
    }
  }, [questions, dispatch]);

  const handleButtonClick = (quest, index) => {
    handleQuestionClick(quest.id, index);
  };

  const selectedQuestion = questions.find(
    (question) => question.id === selectedQuestionId
  );

  useEffect(() => {
    // Ambil endTime dari localStorage
    const endTime = localStorage.getItem("endTime");

    if (
      !endTime ||
      isNaN(Date.parse(endTime)) ||
      new Date(endTime) <= new Date()
    ) {
      const newEndTime = new Date().getTime() + timer;
      localStorage.setItem("endTime", new Date(newEndTime).toISOString());
      setTimeLeft(newEndTime - new Date().getTime());
    } else {
      setTimeLeft(new Date(endTime).getTime() - new Date().getTime());
    }

    // Update waktu tersisa setiap 10ms
    const interval = setInterval(() => {
      const updatedTimeLeft =
        new Date(localStorage.getItem("endTime")).getTime() -
        new Date().getTime();

      setTimeLeft(updatedTimeLeft > 0 ? updatedTimeLeft : 0);

      if (updatedTimeLeft <= 0) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk mengonversi milidetik ke format hh:mm:ss:ms
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Function to update the question based on new data
  const updateQuestionWithNewData = (newData) => {
    const updatedQuestions = questions.map((quest) =>
      quest.id === newData.id ? { ...quest, ...newData } : quest
    );
    dispatch(setQuestions(updatedQuestions)); // Dispatch updated questions to the Redux store
  };

  useEffect(() => {
    // Update the question with the new data
    updateQuestionWithNewData(submittedAnswer);
  }, []);

  const handleAnswerSelect = (questionId, multipleChoiceId) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [questionId]: multipleChoiceId,
    };

    // Set state `selectedAnswers` dan langsung dispatch state yang telah diperbarui ke Redux
    setselectedAnswers(updatedAnswers);

    // Kirim state yang sudah diperbarui ke Redux
    dispatch(setAnswer(updatedAnswers));

    setSelectedmultipleChoiceId(multipleChoiceId);

    // Simpan jawaban ke backend (redux action)
    let data = { multipleChoiceId };
    dispatch(answerQuestion(data, token));
  };

  useEffect(() => {
    if (
      options.length > 0 &&
      options.every((option) => option.image === null || option.image === "")
    ) {
      setimageBased(true);
    } else {
      setimageBased(false);
    }
  }, [selectedQuestionId, indexOption, options]);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    setShowConfirmModal(true); // Tampilkan modal konfirmasi
  };

  const confirmLogout = () => {
    localStorage.clear(); // Hapus semua data dari localStorage
    window.location.reload(); // Refresh halaman
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowConfirmModal(false); // Tutup modal konfirmasi
  };

  const modalQuestOpen = () => {
    setShowModalQuest(true);
  };

  const modalQuestClose = () => {
    setShowModalQuest(false);
  };

  // Pastikan user dan selectedQuestion aman untuk diakses
  if (!selectedQuestion || !user) {
    return null; // Bisa mengganti null dengan komponen loading atau error
  }

  return (
    <div className="flex flex-col max-sm:bg-gray-100">
      {" "}
      {/* Header  */}
      <div className="fixed z-50 w-full bg-white shadow-md">
        <div className="container mx-auto flex lg:py-2 px-6">
          <div className="flex w-full justify-between">
            <img
              src="\img\logo.svg"
              className="lg:w-[350px] max-lg:w-1/2 py-4"
            />
            <div
              className="flex justify-center items-center gap-3 max-lg:gap-2 relative max-lg:text-sm"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p>{user.name.split(" ")[0]}</p>
              <img
                src="\img\icon_profil.svg"
                className="lg:w-[32px] max-lg:w-[24px] md:w-[28px]"
              />
              {dropdownOpen && (
                <div className="absolute right-0 lg:mt-[200px] max-lg:mt-[150px] bg-white shadow-lg border rounded-md w-56 z-40">
                  <div className="p-4">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <hr />
                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Konfirmasi</h2>
              <p>Apakah Anda yakin ingin logout?</p>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2 hover:bg-gray-400 hover:text-gray-200"
                  onClick={cancelLogout}
                >
                  Batal
                </button>
                <button
                  className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
                  onClick={confirmLogout}
                >
                  Ya, Saya yakin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Tombol Baru dengan Posisi Absolut */}
      <button
        className="lg:hidden top-[150px] z-50 left-[10px] transform -translate-x-1/2 fixed bg-yellow-300 text-white p-4 rounded hover:bg-yellow-400"
        onClick={modalQuestOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className="ms-5"
        >
          <path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z" />
          <path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
          <path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z" />
          <path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
        </svg>
      </button>
      {/* Modal Baru */}
      {showModalQuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%]">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4"></h2>
              <button
                className="rounded-md px-4 py-2"
                onClick={modalQuestClose}
              >
                X
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid max-lg:grid-cols-5 md:grid-cols-10 gap-2 p-4">
                {questions.map((quest, index) => {
                  const isAnswered = selectedAnswers[quest.id]; // Check if the question is answered
                  return (
                    <button
                      key={quest.id}
                      onClick={() => {
                        handleButtonClick(quest, index);
                        setindex(index + 1);
                        modalQuestClose();
                      }}
                      className={`h-10 w-10 rounded border ${
                        selectedQuestionId === quest.id
                          ? "bg-gray-300"
                          : isAnswered
                          ? "bg-yellow-200" // Green background if the question is answered
                          : "bg-white" // Default white background
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <button
                className="py-2 my-5 bg-red-600 w-[75%] text-white hover:bg-red-700 rounded-xl"
                onClick={(e) => {
                  modalQuestClose();
                  openModal();
                }}
              >
                Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex-grow lg:mt-24 max-lg:mt-12 md:mt-20 z-10">
        {/* Content  */}
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
          <div className="container mx-auto flex max-lg:flex-col px-6 pt-6 gap-6 max-lg:gap-2 ">
            {/* Time Mobile  */}
            <div className="bg-white p-2 rounded-xl border border-1 lg:hidden ">
              <div className="flex flex-col items-center bg-red-200 justify-center m-2 py-2 rounded-xl border">
                <p className="text-sm">Sisa Waktu</p>
                <p>
                  <strong>{formatTime(timeLeft)}</strong>
                </p>
              </div>
            </div>
            {/* sisi kiri  */}
            <div className="flex flex-col gap-2  max-lg:hidden">
              <div className="bg-white p-2 rounded-xl border border-1">
                <div className="flex flex-col items-center bg-red-200 justify-center m-2 py-2 rounded-xl border">
                  <p className="text-sm">Sisa Waktu</p>
                  <p>
                    <strong>{formatTime(timeLeft)}</strong>
                  </p>
                </div>
              </div>
              <div className="border rounded-xl bg-white">
                {/* Number Grid */}
                <div className="flex flex-col items-center max-lg:hidden">
                  <div className="grid grid-cols-7 gap-2 p-4">
                    {questions.map((quest, index) => {
                      const isAnswered = selectedAnswers[quest.id]; // Check if the question is answered
                      return (
                        <button
                          key={quest.id}
                          onClick={() => {
                            handleButtonClick(quest, index);
                            setindex(index + 1);
                          }}
                          className={`h-10 w-10 rounded-lg border ${
                            selectedQuestionId === quest.id
                              ? "bg-gray-300"
                              : isAnswered
                              ? "bg-yellow-200" // Green background if the question is answered
                              : "bg-white" // Default white background
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="py-2 my-5 w-[90%] bg-red-600 text-white hover:bg-red-700 rounded-xl"
                    onClick={(e) => {
                      openModal();
                    }}
                  >
                    Kumpulkan
                  </button>
                </div>
              </div>
            </div>

            {/* <Text /> */}
            {/* Bagian kanan: Tampilan soal yang dipilih */}
            <div className="border mb-4 lg:w-[70%] max-lg:w-[100%] rounded-xl bg-white">
              <div className="flex flex-col items-center justify-center p-3 h-[80px] border">
                <p>Pertanyaan {index}</p>
              </div>
              <hr />
              <div className="lg:p-12 max-lg:p-8">
                <div className="pb-12 flex flex-col gap-4">
                  {selectedQuestion.question && (
                    <p className="">{selectedQuestion.question}</p>
                  )}
                  {selectedQuestion.image && (
                    <img
                      src={selectedQuestion.image}
                      className="w-[40%] h-[40%] max-lg:w-[100%]"
                    />
                  )}
                </div>
                {imageBased === false ? (
                  // Jika soal berbasis gambar, tampilkan opsi dalam grid
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-6">
                    {options.map((option) => (
                      <button
                        key={option.id} // Pastikan key unik
                        className={`border flex justify-center rounded-xl px-5 text-start ${
                          selectedAnswers[selectedQuestion.id] === option.id
                            ? "bg-yellow-200"
                            : "hover:bg-yellow-100"
                        }`}
                        onClick={() => {
                          handleAnswerSelect(selectedQuestion.id, option.id);
                        }}
                      >
                        <div className="flex gap-2">
                          <span className="flex  py-5 text-lg">
                            {selectedAnswers[selectedQuestion.id] ===
                            option.id ? (
                              <div className=" rounded-full border-2 w-5 h-5 border-black bg-black"></div>
                            ) : (
                              <div className="rounded-full border-2 w-5 h-5 border-black "></div>
                            )}
                          </span>
                          {option.image && (
                            <img
                              src={option.image}
                              className="w-[85%] h-[85%] py-5"
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  // Jika soal berbasis teks, tampilkan opsi tersusun ke bawah
                  <div className="flex flex-col gap-4">
                    {options.map((option, index) => (
                      <button
                        key={option.id} // Pastikan key unik
                        className={`border flex justify-start rounded-xl p-2 text-start ${
                          selectedAnswers[selectedQuestion.id] === option.id
                            ? "bg-yellow-200"
                            : "hover:bg-yellow-100"
                        }`}
                        onClick={() => {
                          handleAnswerSelect(selectedQuestion.id, option.id);
                          console.log(
                            `Option ${option.id} selected for question ${selectedQuestion.id}`
                          );
                        }}
                      >
                        <span className="mr-2 flex items-center justify-center h-6 px-3 text-lg">
                          {selectedAnswers[selectedQuestion.id] ===
                          option.id ? (
                            <div className=" rounded-full border-2 border-black p-2 bg-black"></div>
                          ) : (
                            <div className="rounded-full border-2 border-black p-2 "></div>
                          )}
                        </span>
                        <p>{option.description}</p>
                      </button>
                    ))}
                  </div>
                )}
                <div className="pt-8 flex justify-between">
                  {/* Tombol Kembali */}
                  {index > 1 ? (
                    <button
                      className="p-2 lg:px-12 max-lg:px-4 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white rounded-xl"
                      onClick={() => {
                        if (index > 1) {
                          handleQuestionClick(
                            questions[indexOption - 1].id,
                            indexOption - 1
                          );
                          setindex(index - 1);
                        }
                      }}
                    >
                      Kembali
                    </button>
                  ) : (
                    <div /> // Placeholder agar tombol "Selanjutnya" tetap berada di paling kanan
                  )}

                  {/* Tombol Selanjutnya atau Selesai */}
                  <button
                    className="p-2 lg:px-12 max-lg:px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                    onClick={() => {
                      if (index < questions.length) {
                        handleQuestionClick(
                          questions[indexOption + 1].id,
                          indexOption + 1
                        );
                        setindex(index + 1);
                      } else {
                        openModal();
                      }
                    }}
                  >
                    {index === questions.length ? "Selesai" : "Selanjutnya"}
                  </button>
                </div>
                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg lg:w-96 max-lg:w-[80%]">
                      <h2 className="text-xl font-bold mb-4">Konfirmasi</h2>
                      <p>Apakah Anda yakin ingin mengakhiri tes?</p>
                      <div className="flex justify-end mt-6">
                        <button
                          className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2"
                          onClick={closeModal}
                        >
                          Batal
                        </button>
                        <button
                          className="bg-red-600 text-white rounded-md px-4 py-2"
                          onClick={() => {
                            dispatch(submitTest(navigate, toast));
                            closeModal();
                          }}
                        >
                          Ya, saya yakin
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Question;
