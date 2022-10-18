import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalBody,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Patient } from "../../interface/interface";
import api from "../../services/api";
import Home from "../pages/home";

const InfoPatient = () => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [dataPatient, setDataPatient] = useState([""]);
  const [sintomas, setSintomas] = useState([""]);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      api.get(`dbPatients/${id}`).then((resp) => {
        const data: any[] = [resp.data];
        setDataPatient(data);
      });
    }, 1000);
  }, []);
  return (
    <div>
      <div>
        <Modal show={show}>
          <Modal.Dialog>
            <Modal.Header closeButton onClick={() => setShow(false)}>
              Informações pessoais:
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Data de nascimento</th>
                    <th>Idade</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPatient.map((item: any) => {
                    return (
                      <tr key={1}>
                        <td>{item.name}</td>
                        <td>{item.birthdate}</td>
                        <td>{item.age}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {dataPatient.map((item: any) => {
                return (
                  <div key={1}>
                    <p>Sintomas registrados</p>
                    {item.tosse && <h3>{item.tosse}</h3>}
                    {item.respirar && <h3>{item.respirar}</h3>}
                    {item.olfato && <h3>{item.olfato}</h3>}
                    {item.coriza && <h3>{item.coriza}</h3>}
                    {item.nariz && <h3>{item.nariz}</h3>}
                  </div>
                );
              })}
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
        <Button onClick={() => setShow(true)}>Ver mais</Button>
      </div>
    </div>
  );
};

export default InfoPatient;
