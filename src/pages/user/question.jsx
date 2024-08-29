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

function Question() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.question.answers);
  const [selectedAnswers, setselectedAnswers] = useState(answer || {});
  const [selectedmultipleChoiceId, setSelectedmultipleChoiceId] =
    useState(null);
  const [imageBased, setimageBased] = useState(true);
  const [indexOption, setindexOption] = useState(0);
  const [index, setindex] = useState(1);
  const timer = useSelector(
    (state) => state.question.timer.remainingTime || []
  );
  const [timeLeft, setTimeLeft] = useState(timer);
  const question = useSelector((state) => state.question);
  const token = useSelector((state) => state.auth.token);
  const questions = useSelector((state) => state.question.question || []);
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    questions.length > 0 ? questions[0].id : null
  ); // Default ke soal pertama
  const options = useSelector(
    (state) => state.question.question[indexOption]?.MultipleChoices || []
  );
  const submittedAnswer = useSelector(
    (state) => state.question.submittedAnswer || []
  );

  useEffect(() => {
    console.log("===============================================");
    console.log("selectedQuestionId", selectedQuestionId);
    console.log("submittedAnswer", submittedAnswer);
    console.log("answer", answer);
    console.log("selectedmultipleChoiceId", selectedmultipleChoiceId);
    console.log("selectedAnswer", selectedAnswers);
    console.log("Total questions:", questions.length);
    console.log("pertanyaan", questions);
    console.log("question", question);
    console.log("option", options);
    console.log("timer", timer);
  }, [selectedQuestionId, indexOption]);

  useEffect(() => {
    dispatch(getPesertaQuestion(navigate));
  }, []);

  const handleQuestionClick = (id, index) => {
    setindexOption(index);
    setSelectedQuestionId(id);
  };

  useEffect(() => {
    // Function to populate selectedAnswers from initial response data
    const initializeSelectedAnswers = () => {
      const initialSelectedAnswers = {};

      questions.forEach((question) => {
        const selectedChoice = question.MultipleChoices.find(
          (choice) =>
            choice.AnswerHistories && choice.AnswerHistories.length > 0
        );

        if (selectedChoice) {
          initialSelectedAnswers[question.id] = selectedChoice.id;
        }
      });

      setselectedAnswers(initialSelectedAnswers);
      dispatch(setAnswer(initialSelectedAnswers));
    };

    // Call the function on component mount
    initializeSelectedAnswers();
  }, [questions, dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedQuestionId(questions[0].id); // Set ID pertanyaan pertama jika ada data
    }
  }, [questions]);

  const handleButtonClick = (quest, index) => {
    handleQuestionClick(quest.id, index);
  };

  const selectedQuestion = questions.find(
    (question) => question.id === selectedQuestionId
  );

  useEffect(() => {
    // Ambil endTime dari localStorage
    const endTime = localStorage.getItem("endTime");

    if (!endTime || new Date(endTime) <= new Date()) {
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
    setselectedAnswers({
      ...selectedAnswers,
      [questionId]: multipleChoiceId,
    });
    dispatch(setAnswer(selectedAnswers));
    setSelectedmultipleChoiceId(multipleChoiceId);
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

  return (
    <div className="flex flex-col max-sm:bg-gray-100">
      <Header />
      <main className="flex-grow mt-[63px] lg:mt-20 z-10">
        <div className="container mx-auto flex  px-6 pt-6 gap-6 ">
          <div className="border w-[30%] rounded-xl bg-white">
            <div className="flex flex-col items-center bg-red-200 justify-center m-2 py-2 rounded-xl border">
              <p className="text-sm">Sisa Waktu</p>
              <p>
                <strong>{formatTime(timeLeft)}</strong>
              </p>
            </div>
            <hr />
            {/* Number Grid */}
            <div className="flex flex-col items-center ">
              <div className="grid grid-cols-7 gap-2 p-4">
                {questions.map((quest, index) => {
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
                          : "bg-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <button
                className="py-2 bg-red-600 w-[75%] text-white hover:bg-red-700 rounded-xl"
                onClick={(e) => {
                  dispatch(submitTest(navigate));
                }}
              >
                Kumpulkan
              </button>
            </div>
          </div>
          {/* <Text /> */}
          {/* Bagian kanan: Tampilan soal yang dipilih */}
          <div className="border w-[70%] rounded-xl bg-white">
            <div className="flex flex-col items-center justify-center p-3 h-[80px] border">
              <p>Pertanyaan {index}</p>
            </div>
            <hr />
            <div className="p-12">
              <p className="pb-12">{selectedQuestion.question}</p>
              {imageBased === false ? (
                // Jika soal berbasis gambar, tampilkan opsi dalam grid
                <div className="grid grid-cols-3 justify-center items-center gap-6">
                  {options.map((option, index) => (
                    <button
                      key={option.id} // Pastikan key unik
                      className={`border flex justify-between rounded-xl px-5 text-start ${
                        selectedAnswers[selectedQuestion.id] === option.id
                          ? "bg-yellow-200"
                          : "hover:bg-yellow-100"
                      }`}
                      onClick={() => {
                        handleAnswerSelect(selectedQuestion.id, option.id);
                      }}
                    >
                      <span className="flex py-5 text-lg">
                        {selectedAnswers[selectedQuestion.id] === option.id ? (
                          <div className=" rounded-full border-2 border-black p-2 bg-black"></div>
                        ) : (
                          <div className="rounded-full border-2 border-black p-2 "></div>
                        )}
                      </span>
                      {option.image && (
                        <img
                          src={option.image}
                          className="w-[150px] h-[150px] py-5"
                        />
                      )}
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
                    className="p-2 px-12 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white rounded-xl"
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
                  className="p-2 px-12 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                  onClick={() => {
                    if (index < questions.length) {
                      handleQuestionClick(
                        questions[indexOption + 1].id,
                        indexOption + 1
                      );
                      setindex(index + 1);
                    } else {
                      dispatch(submitTest(navigate));
                    }
                  }}
                >
                  {index === questions.length ? "Selesai" : "Selanjutnya"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Question;
