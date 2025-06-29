import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMahasiswa = async () => {
    try {
      const res = await getMahasiswa(id);
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, [id]);

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (!mahasiswa) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Detail Mahasiswa</h2>
      <p className="py-2 px-4"><strong>NIM:</strong> {mahasiswa.nim}</p>
      <p className="py-2 px-4"><strong>Nama:</strong> {mahasiswa.nama}</p>
    </div>
  );
};

export default MahasiswaDetail;