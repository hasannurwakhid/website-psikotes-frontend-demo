import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import {
  deleteQuestion,
  questions,
} from "../../redux/actions/allCategoryAction"; // Pastikan Anda membuat action `setAnswerKey`
import { setAnswerKey } from "../../redux/reducers/allCategoryReducers";
import Modal from "../../components/modal";

function EditQuestions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState(false);
  const [id, setId] = useState(null);
  const questionList = useSelector((auth) => auth?.allCategory?.questions);
  const answerKeys = useSelector((auth) => auth?.allCategory?.answerKey); // Redux state for answer keys
  const [selectedValue, setSelectedValue] = useState({
    categoryName: "",
  });
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedChoices, setEditedChoices] = useState(
    questionList[id]?.MultipleChoices || ""
  );
  const [editedPoint, setEditedPoint] = useState(""); // For point dropdown

  useEffect(() => {
    if (selectedValue.categoryName && selectedValue.categoryName.id) {
      const categoryId = selectedValue.categoryName.id;
      console.log("categoryId", categoryId);
      dispatch(questions(categoryId));
    }
  }, [dispatch, selectedValue.categoryName]);

  useEffect(() => {
    console.log("questionList", questionList);
    console.log("answerKeys", answerKeys);
    console.log("editedChoices", editedChoices);
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleConfirm = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };

  const toggleEditConfirm = (id) => {
    setIsConfirmEditOpen(!isConfirmEditOpen);
  };

  const handleDeletedQuestion = async () => {
    await dispatch(deleteQuestion(id));
    dispatch(questions(categoryId));
  };

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedValue({
        categoryName: location.state.category || "",
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (questionList && questionList.length > 0) {
      const answerKeysObject = {};

      questionList.forEach((quest) => {
        const answerKey = quest.MultipleChoices?.find(
          (choice) => choice.AnswerKey !== null
        )?.id; // Gunakan optional chaining untuk menghindari error

        if (answerKey) {
          answerKeysObject[quest.id] = answerKey;
        }
      });

      dispatch(setAnswerKey(answerKeysObject));
    }
  }, [questionList, dispatch]);

  const handleDeleteClick = () => {
    toggleConfirm();
  };

  const handleEditClick = (id) => {
    setId(id);
    setEditedQuestion(questionList[id].question); // Set question value to state
    setEditedChoices(questionList[id].MultipleChoices); // Set choices to state
    setEditedPoint(questionList[id].point); // Set point to state
    toggleEditConfirm();
  };

  const handleSaveChanges = () => {
    const updatedQuestion = {
      ...questionList[id],
      question: editedQuestion,
      MultipleChoices: editedChoices,
      point: editedPoint,
    };

    // Dispatch action to save the updated question
    dispatch(updateQuestion(updatedQuestion));

    toggleEditConfirm();
  };

  const handleDescriptionChange = (index, newDescription) => {
    setEditedChoices((prevChoices) =>
      prevChoices.map((choice, i) =>
        i === index ? { ...choice, description: newDescription } : choice
      )
    );
  };

  return (
    <div className="flex flex-col maxsm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative flex flex-grow">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="flex justify-between items-center mb-3 pl-1 pr-1">
            <div className="bg-white  text-xl w-[50%] flex rounded-xl p-3 gap-4 shadow">
              <label className="font-bold">Kategori Soal: </label>
              <input
                type="text"
                placeholder="Kategori Soal"
                value={selectedValue.categoryName.category || ""}
                onChange={(e) =>
                  setSelectedValue({
                    ...selectedValue,
                    categoryName: e.target.value,
                  })
                }
                className="border rounded-lg px-4 py-2 h-8 font-semibold"
              />
            </div>
            <div className="flex justify-between">
              <button className="flex justify-center items-center w-[120px] h-10 bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-100 rounded-lg shadow font-bold">
                Tambah Soal
              </button>
            </div>
          </div>

          {questionList.length > 0 &&
            questionList.map((quest, index) => (
              <div
                key={quest.id}
                className="bg-white p-3 mb-4 rounded-xl shadow"
              >
                <div className="border border-gray-300 rounded-xl bg-white p-2 mb-2">
                  <div className="pb-12 flex flex-col gap-4">
                    {quest.question && (
                      <textarea
                        className="pl-1 w-full h-12 p-2 border-none focus:outline-none text-md placeholder-gray-500"
                        placeholder="Tulis Pertanyaan"
                        value={quest.question}
                        readOnly
                      />
                    )}

                    {quest.image && (
                      <img
                        src={quest.image}
                        className="w-[40%] h-[40%] max-lg:w-[100%]"
                        alt="question"
                      />
                    )}
                  </div>

                  {/* Cek apakah soal berbasis gambar atau teks */}
                  {quest.MultipleChoices &&
                  quest.MultipleChoices.every((option) => !option.image) ? (
                    <div className="flex flex-col gap-4">
                      {quest.MultipleChoices.map((option) => (
                        <button
                          key={option.id}
                          className={`border flex justify-start rounded-xl p-2 text-start gap-3 ${
                            answerKeys?.[quest.id] === option.id
                              ? "bg-green-400"
                              : ""
                          }`}
                          // Tambahkan class hijau jika itu AnswerKey
                        >
                          <span className="flex text-lg">
                            {answerKeys?.[quest.id] === option.id ? (
                              <div className=" rounded-full border-2 w-5 h-5 border-black bg-black"></div>
                            ) : (
                              <div className="rounded-full border-2 w-5 h-5 border-black "></div>
                            )}
                          </span>
                          {option.description && <p>{option.description}</p>}

                          {option.image && (
                            <img
                              src={option.image}
                              className="w-[40%] h-[40%] max-lg:w-[100%]"
                              alt="question"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-6">
                      {quest.MultipleChoices.map((option) => (
                        <button
                          key={option.id}
                          className={`border flex justify-start rounded-xl p-2 text-start gap-3 ${
                            answerKeys?.[quest.id] === option.id
                              ? "bg-green-400"
                              : ""
                          }`}
                        >
                          <div className="flex gap-3 w-full h-full items-center">
                            <span className="flex text-lg">
                              {answerKeys?.[quest.id] === option.id ? (
                                <div className="rounded-full border-2 w-5 h-5 border-black bg-black"></div>
                              ) : (
                                <div className="rounded-full border-2 w-5 h-5 border-black"></div>
                              )}
                            </span>
                            <div className="flex flex-col items-start w-full h-full">
                              {option.description && (
                                <p className="flex-grow">
                                  {option.description}
                                </p>
                              )}
                              {option.image && (
                                <img
                                  src={option.image}
                                  className="w-auto h-[150px] max-lg:w-[100%] object-cover"
                                  alt="option"
                                />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end m-4 space-x-2">
                  <button
                    className="text-gray-400 hover:text-gray-500 mt-[1px]"
                    onClick={() => {
                      handleEditClick(index);
                    }}
                  >
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M15.586 4.586a2 2 0 112.828 2.828L10 15.828l-4 1 1-4 8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => {
                      handleDeleteClick(index);
                    }}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m2 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6h12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          {/* Confirm Delete Modal */}
          <Modal isOpen={isConfirmOpen} onClose={toggleConfirm}>
            <p className="py-4">Apakah Anda yakin ingin menghapus soal ini?</p>
            <div className="flex justify-end mt-2">
              <button
                className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={toggleConfirm}
              >
                Batal
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={handleDeletedQuestion}
              >
                Hapus
              </button>
            </div>
          </Modal>
          {/* Modal */}
          {isConfirmEditOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-12 rounded-lg shadow-lg w-[60%] mt-20 lg:ml-[250px] max-h-[80vh] overflow-y-auto">
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col gap-3 w-full">
                    {questionList[id].question && (
                      <input
                        type="text"
                        className="p-2 border-b border-gray-600 w-full"
                        placeholder="Pertanyaan"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)} // Update question value
                      />
                    )}
                    {questionList[id].image && (
                      <div>
                        <img src={questionList[id].image} alt="" />
                      </div>
                    )}
                  </div>
                  <button className="hover:bg-gray-200 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-12">
                  {editedChoices.map((choices, index) => (
                    <div className="flex gap-3  my-4">
                      <div className="rounded-full border-2 mt-3 w-5 h-5 border-black"></div>
                      <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="p-2 border-b border-gray-600 w-full"
                            placeholder="Opsi jawaban"
                            value={choices.description}
                            onChange={(e) =>
                              handleDescriptionChange(index, e.target.value)
                            }
                          />
                          <button className="hover:bg-gray-200 p-2 rounded-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                              />
                            </svg>
                          </button>
                        </div>

                        {choices.image && (
                          <div>
                            <img
                              src={choices.image}
                              alt=""
                              className="h-[100px]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between mt-6 items-center gap-2">
                    {/* Dropdown */}
                    <div>
                      {/* Dropdown for Points */}
                      <select
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white"
                        value={editedPoint}
                        onChange={(e) => setEditedPoint(e.target.value)} // Update point value
                      >
                        <option value="5">5 Point</option>
                        <option value="10">10 Point</option>
                        <option value="15">15 Point</option>
                        <option value="20">20 Point</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      {/* Button Batal */}
                      <button
                        className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 hover:text-gray-200"
                        onClick={toggleEditConfirm}
                      >
                        Batal
                      </button>

                      {/* Button Ya, Saya yakin */}
                      <button
                        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
                        onClick={handleSaveChanges}
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default EditQuestions;
