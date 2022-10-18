import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import api from "../../services/api";
import Row from "react-bootstrap/Row";
import { Spacing } from "../../styles";
import { ControlContext } from "../../controlProvider";

const FormModal = () => {
  const [name, setName] = useState("");
  const [identifier, setCpf] = useState("");
  const [birthdate, setDate] = useState("");
  const [phone, setNumber] = useState("");
  const [age, setAge] = useState();

  const { status, setStatus, sintomas, setSintomas } =
    useContext(ControlContext);

  const getName = (event) => {
    ValidateInputs();
    setName(event.target.value);
  };
  const getCpf = (event) => {
    ValidateInputs();
    if (event.target.value.length == 11) {
      setCpf(event.target.value);
    }
  };
  const getBirthdate = (event) => {
    ValidateInputs();
    const dd = event.target.value.slice(8, 10);
    const mm = event.target.value.slice(5, 7);
    const yy = event.target.value.slice(0, 4);
    const yyActualy = new Date().getFullYear();
    const dateFormate = `${dd}-${mm}-${yy}`;
    const age = yyActualy - yy;
    setDate(dateFormate);
    setAge(age);
  };
  const getPhone = (event) => {
    const phoneDdd = event.target.value.slice(0, 2);
    const phoneF = event.target.value.slice(2, 11);
    const phoneFormate = `${phoneDdd}${phoneF}`;
    ValidateInputs();
    setNumber(phoneFormate);
  };

  const ValidateInputs = () => {
    if (!name.value & !identifier.value & !birthdate.value & !phone.value) {
      document.querySelector("#buttonSubmit").disabled = false;
    } else return;
  };

  const getData = (event) => {
    if (identifier.length == 11) {
      api.post("dbPatients", {
        name,
        identifier,
        birthdate,
        phone,
        status,
        age,
      });

      event.preventDefault();
      setTimeout(() => {
        window.location.reload();
      }, 250);
      setShow(false);
    } else {
      event.preventDefault();
      alert(`CPF inválido: Precisa ter 11 números`);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Spacing>
        <Button onClick={() => setShow(true)}>Cadastrar</Button>
      </Spacing>
      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation="true"
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de pacientes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={getData}>
              <Form.Group className="mb-3" as={Col} md="12">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                  minLength={4}
                  required
                  type="name"
                  placeholder="Digite seu nome completo"
                  onChange={getName}
                ></Form.Control>
              </Form.Group>

              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>N° do CPF</Form.Label>
                  <Form.Control
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 11))
                    }
                    required
                    type="number"
                    placeholder="Apenas números"
                    onChange={getCpf}
                  ></Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    required
                    type="date"
                    placeholder="Digite seu nome completo"
                    onChange={getBirthdate}
                  ></Form.Control>
                </Form.Group>
              </Row>

              <Form.Group>
                <Form.Label>N° de telefone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="(00) 90000-0000"
                  onChange={getPhone}
                ></Form.Control>
              </Form.Group>
              <Spacing>
                <Button
                  id="buttonSubmit"
                  variant="secondary"
                  type="Submit"
                  onClick={getData}
                >
                  Cadastrar
                </Button>
              </Spacing>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};
export default FormModal;
