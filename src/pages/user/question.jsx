import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "@fortawesome/fontawesome-free/js/all.js";
import { useSelector } from "react-redux";

function Question() {
  const navigate = useNavigate();
  const [selectedAnswers, setselectedAnswers] = useState({});
  const [imageBased, setimageBased] = useState(true);
  const [indexOption, setindexOption] = useState(0);
  const [index, setindex] = useState(1);
  const [timeLeft, setTimeLeft] = useState(300); // 300 detik = 5 menit
  const questions = useSelector((state) => state.question.question);
  const [selectedQuestionId, setSelectedQuestionId] = useState(questions[0].id); // Default ke soal pertama
  const options = useSelector(
    (state) => state.question.question[indexOption]?.MultipleChoices || []
  );

  useEffect(() => {
    console.log("selectedQuestionId", selectedQuestionId);
    console.log("selectedAnswers", selectedAnswers);
  }, [selectedQuestionId, indexOption, selectedAnswers]);

  const handleQuestionClick = (id, index) => {
    setindexOption(index);
    setSelectedQuestionId(id);
  };

  const handleButtonClick = (quest, index) => {
    handleQuestionClick(quest.id, index);
  };

  const selectedQuestion = questions.find(
    (question) => question.id === selectedQuestionId
  );

  useEffect(() => {
    // Fungsi untuk mengupdate waktu setiap detik
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk mengonversi detik ke format hh:mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setselectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
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
        <div className="container mx-auto flex px-6 pt-6 gap-6">
          <div className="border w-[30%] rounded-xl bg-white">
            <div className="flex flex-col items-center bg-red-200 justify-center m-2 py-2 rounded-xl border">
              <p className="text-sm">Sisa Waktu</p>
              <p>
                <strong>{formatTime(timeLeft)}</strong>
              </p>
            </div>
            <hr />
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-7 gap-2 p-4">
                {questions.map((quest, index) => (
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
                ))}
              </div>
              <button
                className="py-2 bg-red-600 w-[75%] text-white hover:bg-red-700 rounded-xl"
                onClick={() => navigate("/result")}
              >
                Kumpulkan
              </button>
            </div>
          </div>
          <div className="border w-[70%] rounded-xl bg-white">
            <div className="flex flex-col items-center justify-center p-3 h-[80px] border">
              <p>Pertanyaan {index}</p>
            </div>
            <hr />
            <div className="p-12">
              <p className="pb-12">{selectedQuestion.question}</p>
              {imageBased === false ? (
                <div className="grid grid-cols-3 justify-center items-center gap-4">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className={`border flex justify-start rounded-xl p-2 text-start ${
                        selectedAnswers[selectedQuestion.id] === option.id
                          ? "bg-yellow-200"
                          : "hover:bg-yellow-100"
                      }`}
                      onClick={() =>
                        handleAnswerSelect(selectedQuestion.id, option.id)
                      }
                    >
                      <span className="mr-2 text-lg">
                        {selectedAnswers[selectedQuestion.id] === option.id ? (
                          <i className="fas fa-dot-circle"></i> // Lingkaran isi
                        ) : (
                          <i className="far fa-circle"></i> // Lingkaran kosong
                        )}
                      </span>
                      {option.image && (
                        <img
                          src={option.image}
                          className="w-[200px] h-[200px]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className={`border flex justify-start rounded-xl p-2 text-start ${
                        selectedAnswers[selectedQuestion.id] === option.id
                          ? "bg-yellow-200"
                          : "hover:bg-yellow-100"
                      }`}
                      onClick={() =>
                        handleAnswerSelect(selectedQuestion.id, option.id)
                      }
                    >
                      <span className="mr-2 text-lg">
                        {selectedAnswers[selectedQuestion.id] === option.id ? (
                          <i className="fas fa-dot-circle"></i> // Lingkaran isi
                        ) : (
                          <i className="far fa-circle"></i> // Lingkaran kosong
                        )}
                      </span>
                      <p>{option.description}</p>
                    </button>
                  ))}
                </div>
              )}
              <div className="pt-8 flex justify-between">
                <button className="p-2 px-12 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white rounded-xl">
                  Kembali
                </button>
                <button className="p-2 px-12 bg-red-600 hover:bg-red-700 text-white rounded-xl">
                  Selanjutnya
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
