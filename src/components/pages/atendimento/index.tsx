import { stat } from "fs/promises";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Table,
  ModalBody,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ControlContext } from "../../../controlProvider";
import { Patient } from "../../../interface/interface";
import api from "../../../services/api";
import { FlexContainer, FlexContainerLine, Spacing } from "../../../styles";
import InfoPatient from "../../fullInfo";

const Atendimento = () => {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tosse, setTosse] = useState("");
  const [respirar, setRespirar] = useState("");
  const [olfato, setOlfato] = useState("");
  const [coriza, setCoriza] = useState("");
  const [nariz, setNariz] = useState("");
  const [temperatura, setTemperatura] = useState(0);
  const [statusTemperatura, setStatusTemperatura] = useState("");
  const [frequencia, setFrequencia] = useState(0);
  const [statusFrequencia, setStatusFrequencia] = useState("");
  const { status, setStatus } = useContext(ControlContext);
  const handleClose = () => setShow(false);
  const { id } = useParams();
  const [patient, setPatient] = useState([{ name: "" }]);
  useEffect(() => {
    api.get(`dbPatients/${id}`).then(({ data }) => {
      const teste: any[] = [data];
      setPatient(teste);
    });
  }, []);
  const getData = (event: any) => {
    api
      .put(`dbPatients/${id}`, {
        status: "Atendido",
        temperatura,
        statusTemperatura,
        frequencia,
        statusFrequencia,
      })
      .then((response) => {
        try {
          console.log("Sucesso");
        } catch (error) {
          console.log(error);
        }
      });
    event.preventDefault();
    setTimeout(() => {
      setShow(false);
      window.location.reload();
    }, 1000);
  };
  const OnCheckTosse = (event: any) => {
    api
      .put(`dbPatients/${id}`, {
        tosse: "Tosse",
      })
      .then((response) => {
        try {
          console.log("Sucesso");
        } catch (error) {
          console.log(error);
        }
      });
  };
  const OnCheckRespirar = (event: any) => {
    api
      .put(`dbPatients/${id}`, {
        respirar: "Dificuldade de respirar",
      })
      .then((response) => {
        try {
          console.log("Sucesso");
        } catch (error) {
          console.log(error);
        }
      });
  };
  const OnCheckOlfato = (event: any) => {
    api
      .put(`dbPatients/${id}`, {
        olfato: "Flta de olfato",
      })
      .then((response) => {
        try {
          console.log("Sucesso");
        } catch (error) {
          console.log(error);
        }
      });
  };
  const OnCheckCoriza = (event: any) => {
    api
      .put(`dbPatients/${id}`, {
        coriza: "Coriza",
      })
      .then((response) => {
        try {
          console.log("Sucesso");
        } catch (error) {
          console.log(error);
        }
      });
  };
  const OnCheckNariz = (event: any) => {
    api
      .put(`dbPatients/${id}`, {
        nariz: "Nariz entupido",
      })
      .then((response) => {
        try {
          console.log("Sucesso");
        } catch (error) {
          console.log(error);
        }
      });
  };
  const OnCheckTemperatura = (event: any) => {
    setTemperatura(event.target.value);
    if (temperatura < 35) {
      setStatusTemperatura("Hipotermia");
    } else if (temperatura >= 36.1 && temperatura <= 37.2) {
      setStatusTemperatura("Afebril");
    } else if (temperatura >= 37.3 && temperatura <= 37.7) {
      setStatusTemperatura("Estado febril");
    } else if (temperatura >= 37.8 && temperatura <= 38.9) {
      setStatusTemperatura("Febril");
    } else if (temperatura >= 39 && temperatura <= 40) {
      setStatusTemperatura("Pirexia");
    } else if (temperatura > 40) {
      setStatusTemperatura("Hiperpirexia");
    }
  };
  const OnCheckFrequencia = (event: any) => {
    setFrequencia(event.target.value);
    if (frequencia < 14) {
      setStatusFrequencia("Bradipnéico");
    } else if (frequencia >= 14 && frequencia <= 20) {
      setStatusFrequencia("Eupnéico");
    } else if (frequencia > 20) {
      setStatusFrequencia("Taquipnéico");
    }
  };

  const showInfor = () => {
    setShowInfo(true);
    setShow(false);
  };
  return (
    <div>
      <Spacing>
        <FlexContainer>
          <Button variant="dark">
            <Link to="/">Voltar</Link>
          </Button>
          <Button onClick={() => setShow(true)}>Ficha de atendimento</Button>
        </FlexContainer>
      </Spacing>
      <Modal show={show} onHide={handleClose}>
        <div></div>
        <Modal.Dialog
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Ficha {tosse}- {patient[0].name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={getData}>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Control
                  required
                  type="number"
                  placeholder="Temperatura"
                  step="0.01"
                  onChange={OnCheckTemperatura}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Control
                  required
                  type="number"
                  placeholder="Frequência cardiáca"
                  onChange={OnCheckFrequencia}
                />
              </Form.Group>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Tosse"
                    id="tosse"
                    onChange={OnCheckTosse}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Dificuldade de respirar"
                    id="respirar"
                    onChange={OnCheckRespirar}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Falta de olfato"
                    id="olfato"
                    onChange={OnCheckOlfato}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Coriza"
                    id="coriza"
                    onChange={OnCheckCoriza}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Nariz entupido"
                    id="nariz"
                    onChange={OnCheckNariz}
                  />
                </Form.Group>
              </Row>
              <Spacing>
                <Button type="submit" id="buttonSubmit" variant="secondary">
                  Cadastrar
                </Button>
              </Spacing>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
      {
        <div>
          {patient.map((item: any) => {
            return (
              <div key={id}>
                <Table striped hover bordered variant="dark">
                  <thead>
                    <tr>
                      <th colSpan={3}>Paciente: {item.name}</th>
                    </tr>
                    <tr>
                      <th>Temperatura</th>
                      <th>Frequência</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {item.temperatura} - {item.statusTemperatura}
                      </td>
                      <td>
                        {item.frequencia} - {item.statusFrequencia}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
      }
      <InfoPatient />
    </div>
  );
};

export default Atendimento;
