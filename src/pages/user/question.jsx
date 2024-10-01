import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, setQuestions } from "../../redux/reducers/questReducers";
import {
  answerQuestion,
  getPesertaQuestion,
} from "../../redux/actions/questAction";
import { toast } from "react-toastify";
import HeaderUser from "../../components/headerUser";
import EndTest from "../../modal/endtest";

function Question() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isDone = useSelector((state) => state?.auth?.profil?.isDone);
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
    if (!token) {
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 1000);
      toast.error("Anda belum memiliki akses, silakan login.");
    }
    if (isDone === true) {
      navigate("/result");
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
      <HeaderUser />
      {/* TOmbol untuk show grid di mobile and tablet */}
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
                      }}
                      className={`h-10 w-10 rounded-lg border ${
                        selectedQuestionId === quest.id
                          ? "bg-gray-300 border-gray-400"
                          : isAnswered
                          ? "bg-yellow-200 border-yellow-500" // Green background if the question is answered
                          : "bg-white" // Default white background
                      }`}
                    >
                      <span>{index + 1}</span>
                    </button>
                  );
                })}
              </div>
              <button
                className="py-2 my-5 bg-red-600 w-[75%] text-white hover:bg-red-700 rounded-xl"
                onClick={(e) => {
                  modalQuestClose();
                  setIsModalOpen(true);
                }}
              >
                Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex-grow lg:mt-24 max-lg:mt-12 md:mt-20 z-10">
        <div className="container mx-auto flex max-lg:flex-col px-6 pt-6  gap-2 max-lg:gap-2 ">
          {/* Time Mobile  */}
          <div className="bg-white p-2 rounded-xl border border-1 lg:hidden ">
            <div className="flex flex-col items-center bg-red-200 border-red-500 justify-center m-2 py-2 rounded-xl border">
              <p className="text-sm">Sisa Waktu</p>
              <p>
                <strong>{formatTime(timeLeft)}</strong>
              </p>
            </div>
          </div>
          {/* sisi kiri  */}
          <div className="flex flex-col gap-2 max-lg:hidden">
            <div className="bg-white p-2 rounded-xl border border-1">
              <div className="flex flex-col items-center bg-red-200 border-red-500 justify-center m-2 py-2 rounded-xl border">
                <p className="text-sm">Sisa Waktu</p>
                <p>
                  <strong>{formatTime(timeLeft)}</strong>
                </p>
              </div>
            </div>
            <div className="border rounded-xl bg-white">
              {/* Number Grid */}
              <div className="flex flex-col items-center max-lg:hidden">
                <div className="grid grid-cols-5 gap-3 p-8">
                  {questions.map((quest, index) => {
                    const isAnswered = selectedAnswers[quest.id]; // Check if the question is answered
                    return (
                      <button
                        key={quest.id}
                        onClick={() => {
                          handleButtonClick(quest, index);
                          setindex(index + 1);
                        }}
                        className={`h-10 w-8 rounded-lg border ${
                          selectedQuestionId === quest.id
                            ? "bg-gray-300 border-gray-400"
                            : isAnswered
                            ? "bg-yellow-200 border-yellow-500" // Green background if the question is answered
                            : "bg-white" // Default white background
                        }`}
                      >
                        <span>{index + 1}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  className="py-2 m-6 w-[80%] bg-red-600 text-white hover:bg-red-700 rounded-xl"
                  onClick={(e) => {
                    setIsModalOpen(true);
                  }}
                >
                  Kumpulkan
                </button>
              </div>
            </div>
          </div>

          {/* <Text /> */}
          {/* Bagian kanan: Tampilan soal yang dipilih */}
          <div className="border mb-4 w-[90%] max-lg:w-[100%] rounded-xl bg-white">
            <div className="flex items-center justify-between lg:px-8 max-lg:p-8 h-[80px] border">
              <p>{selectedQuestion.Category.category}</p>
              <p>Pertanyaan {index}</p>
              <p>{selectedQuestion.point} Point</p>
            </div>
            <hr />
            <div className="lg:py-6 lg:px-8 max-lg:p-8">
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
                // Jika option berbasis gambar, tampilkan opsi dalam grid
                <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-6">
                  {options.map((option) => (
                    <button
                      key={option.id} // Pastikan key unik
                      className={`border h-full flex rounded-xl text-start ${
                        selectedAnswers[selectedQuestion.id] === option.id
                          ? "bg-yellow-200 border-yellow-500"
                          : "hover:bg-yellow-100"
                      }`}
                      onClick={() => {
                        handleAnswerSelect(selectedQuestion.id, option.id);
                      }}
                    >
                      <div className="flex p-5 items-center">
                        <div className="w-[10%] flex justify-center items-center">
                          <span className="flex text-lg items-start justify-start">
                            {selectedAnswers[selectedQuestion.id] ===
                            option.id ? (
                              <div className=" rounded-full border-2 w-5 h-5 border-black bg-black"></div>
                            ) : (
                              <div className="rounded-full border-2 w-5 h-5 border-black "></div>
                            )}
                          </span>
                        </div>
                        <div className="flex-col w-[90%] h-56 flex items-center justify-end gap-2">
                          {option.image && (
                            <img
                              src={option.image}
                              className="w-[90%] h-[85%]"
                            />
                          )}
                          {option.description && <p>{option.description}</p>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                // Jika option berbasis teks, tampilkan opsi tersusun ke bawah
                <div className="flex flex-col gap-4">
                  {options.map((option, index) => (
                    <button
                      key={option.id} // Pastikan key unik
                      className={`border flex justify-start rounded-xl p-2 text-start ${
                        selectedAnswers[selectedQuestion.id] === option.id
                          ? "bg-yellow-200 border-yellow-500"
                          : "hover:bg-yellow-100"
                      }`}
                      onClick={() => {
                        handleAnswerSelect(selectedQuestion.id, option.id);
                      }}
                    >
                      <span className="mr-2 flex items-center justify-center h-6 px-3 text-lg">
                        {selectedAnswers[selectedQuestion.id] === option.id ? (
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
                      setIsModalOpen(true);
                    }
                  }}
                >
                  {index === questions.length ? "Selesai" : "Selanjutnya"}
                </button>
              </div>
              {/* Modal */}
              {isModalOpen && <EndTest setCloseModal={setIsModalOpen} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Question;
