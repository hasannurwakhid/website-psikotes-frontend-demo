import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Text from "../../components/text_based";
import Image from "../../components/image_based";
import { useSelector } from "react-redux";

function Question() {
  const navigate = useNavigate();
  const [selectedAnswers, setselectedAnswers] = useState({});
  const [imageBased, setimageBased] = useState(true);
  const [indexOption, setindexOption] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 300 detik = 5 menit
  const questions = useSelector((state) => state.question.question);
  const options = useSelector(
    (state) => state.question.question[indexOption].MultipleChoices
  );

  useEffect(() => {
    console.log("question", questions);
    console.log("option", options);
  }, []);

  const [selectedQuestionId, setSelectedQuestionId] = useState(questions[0].id); // Default ke soal pertama

  const handleQuestionClick = (id) => {
    setSelectedQuestionId(id);
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
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setselectedAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = () => {
    console.log("Selected Answers: ", answers);
    // Add logic here to handle the submission, like calculating the score
  };

  return (
    <div className="">
      <Header />
      <div className="container mx-auto flex px-6 pt-6 gap-6 ">
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
                      if (
                        options[index].description !== null &&
                        options[index].image === null
                      ) {
                        setimageBased(!imageBased);
                      }
                      handleQuestionClick(quest.id);
                      setindexOption(index);
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
                navigate("/result");
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
            <p>Pertanyaan 1</p>
          </div>
          <hr />
          <div className="p-12">
            <p className="pb-12">{selectedQuestion.question}</p>
            <div className="grid grid-cols-3 justify-center items-center gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  className={`border flex justify-center rounded-xl p-2 text-start ${
                    selectedAnswers[selectedQuestion.id] === option.id
                      ? "bg-yellow-200"
                      : "hover:bg-yellow-100"
                  }`}
                  onClick={() =>
                    handleAnswerSelect(selectedQuestion.id, option.id)
                  }
                >
                  {imageBased === false ? (
                    <img src={option.image} className="w-[200px] h-[200px]" />
                  ) : (
                    <p> {option.description}</p>
                  )}
                </button>
              ))}
            </div>
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
    </div>
  );
}

export default Question;
