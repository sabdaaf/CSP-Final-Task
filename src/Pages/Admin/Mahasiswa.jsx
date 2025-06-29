import { useEffect, useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useNavigate } from "react-router-dom";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";
import { getAllKelas } from "@/Utils/Apis/KelasApi";
import { getAllMataKuliah } from "@/Utils/Apis/MataKuliahApi";
import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";
import {
  toastSuccess,
  toastError,
} from "@/Utils/Helpers/ToastHelpers";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ nim: "", nama: "", max_sks: 0 });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [resMahasiswa, resKelas, resMataKuliah] = await Promise.all([
        getAllMahasiswa(),
        getAllKelas(),
        getAllMataKuliah()
      ]);
      setMahasiswa(resMahasiswa.data);
      setKelas(resKelas.data);
      setMataKuliah(resMataKuliah.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (mhs) => {
    setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama, max_sks: mhs.max_sks });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      await deleteMahasiswa(id);
      toastSuccess("Data berhasil dihapus");
      fetchData();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nim || !form.nama || !form.max_sks) {
      toastError("NIM, Nama, dan Max SKS wajib diisi");
      return;
    }
    if (isEdit) {
      confirmUpdate(async () => {
        await updateMahasiswa(form.id, form);
        toastSuccess("Data berhasil diperbarui");
        resetForm();
        fetchData();
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      await storeMahasiswa(form);
      toastSuccess("Data berhasil ditambahkan");
      resetForm();
      fetchData();
    }
  };

  const resetForm = () => {
    setForm({ nim: "", nama: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const getTotalSks = (mhsId) => {
    return kelas
      .filter(k => k.mahasiswa_ids.includes(mhsId))
      .map(k => mataKuliah.find(mk => mk.id === k.mata_kuliah_id)?.sks || 0)
      .reduce((a, b) => a + b, 0);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">
          Daftar Mahasiswa
        </Heading>
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setForm({ nim: "", nama: "", max_sks: 0 });
            setIsEdit(false);
          }}
        >
          + Tambah Mahasiswa
        </Button>
      </div>
      <TableMahasiswa
        data={mahasiswa}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        getTotalSks={getTotalSks}
      />
      <ModalMahasiswa
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={resetForm}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default Mahasiswa;