import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import {
  createFaqs,
  fetchFaqs,
  updateFaqs,
  deleteFaqs
} from "../../api-calls/apicalls";


function FaqManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [faqs, setFaqs] = useState([])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [name, setName] = useState("")
  const [update,setUpdate]=useState(false)
  const[showModal,setShowModal]=useState(false)
  const [faqId,setFaqId]=useState("")

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    const faqData = {
      name:name,
      question: question,
      answer: answer,

    }
    const createdData = await createFaqs(faqData)
    if (createdData) {
      window.location.reload()
    }
  }

  const handleUpdate=async()=>{
    const faqData = {
      name: name,
      question: question,
      answer:answer,
      faq_id: faqId
    }

       
    const updatedData = await updateFaqs(faqData)
    if (updatedData) {
      window.location.reload()
    }
  }

  const handleDelete=async(id)=>{
    const deleteData={faq_id:id}
    const deletedData=await deleteFaqs(deleteData)
    if(deletedData){
       
   
      alert("faq deleted successfully")

      window.location.reload()
    }
  }


  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
        let tempFaqsData = await fetchFaqs();
        setFaqs([...tempFaqsData]);
    };

    fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && (
          <Sidebar activeOption="faq-management" />
        )}
        <div className="col-md-10 p-4">

          <div className="d-flex justify-content-end mb-5">
            <button
              className="btn "
              style={{
                width: "fit-content",
                background: "#90EE90",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                setUpdate(false);
                setShowModal(true);
              }}
            >
              <AddIcon />
              <span className="ms-2">create</span>
            </button>
          </div>

          <div className="d-flex row">
            <div className="col fw-bold">
              {`Faqs(${faqs.length})`}
            </div>
            <div className="col d-flex">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button
                  className="btn btn-outline-primary"
                  type="search"
                  id="button-addon2"
                >
                  Search
                </button>

              </div>
            </div>
          </div>




          <table className="table mt-1 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                <th scope="col">SN.</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {faqs.length !== 0 && faqs.map((faq, ind) => (
              <tbody>
                <tr >
                  <th scope="col">{ind + 1}</th>
                  <th scope="col"> {faq?.name}</th>

                  <th scope="col ">
                    <CreateIcon
                      className="text-primary border border-primary rounded me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                         setUpdate(true)
                         setName(faq?.name)
                         setQuestion(faq?.question)
                         setAnswer(faq?.answer)
                         setShowModal(true)
                         setFaqId(faq?._id)
                      }}
                    />
                    <DeleteIcon
                      className="text-danger border border-danger cursor-pointer rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                         handleDelete(faq?._id)
                      }}
                    />
                  </th>
                </tr>
              </tbody>
            ))}



          </table>
        </div>
      </div>


      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Faqs" : "Add Faqs"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
          <div className="mb-2">
              <label className="pb-1">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Question</label>
              <input
                type="text"
                className="form-control"
                placeholder="Question"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Answer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
            </div>

     

         
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
               {update?handleUpdate():handleCreate()}
            }}
          >
             {update?"Update":"Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>



  )
}

export default FaqManagement