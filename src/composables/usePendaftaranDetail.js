import { ref, reactive } from "vue";
import { getPendaftaranById } from "@/lib/services/pendaftaranService";

export function usePendaftaranDetail(id) {
  const loading = ref(false);

  const BASE_FILE_URL = import.meta.env.VITE_BASE_FILE_URL;

  const detail = reactive({
    meta: {},
    dokumen: [],
    foto: null,
    pembayaran: null,
    peserta: {},
    alamat: {},
    kesehatan: {},
    informasi: {},
    ayah: {},
    ibu: {},
  });

  const form = reactive({
    peserta: {},
    alamat: {},
    kesehatan: {},
    informasi: {},
    ayah: {},
    ibu: {},
  });

  const mapPendaftaran = (data) => {
    if (!data) return {};

    const peserta = data.peserta || {};
    const orangTua = Array.isArray(peserta.orang_tua) ? peserta.orang_tua : [];

    const ayah = orangTua.find((o) => o.tipe === "ayah");
    const ibu = orangTua.find((o) => o.tipe === "ibu");

    const allDokumen = (data.dokumen || []).map((d) => ({
      ...d,
      file_path: `${BASE_FILE_URL}${d.file_path}`,
    }));

    return {
      meta: {
        id: data.id,
        no_pendaftaran: data.no_pendaftaran,
        created_at: data.created_at,
        tanggal_daftar: data.tanggal_daftar,
        status: data.status,
        status_berkas: data.status_berkas,
        status_pembayaran: data.status_pembayaran,
        status_observasi: data.status_observasi,
        program: data.program,
        jenis: data.jenis,
        gelombang: data.gelombang?.nama,
        tahun_ajaran: data.tahun_ajaran?.label,
        umur: data.umur,
      },

      dokumen: allDokumen.filter((d) =>
        ["kk", "akta", "kia", "surat_pernyataan"].includes(d.jenis_dokumen),
      ),

      foto: allDokumen.find((d) => d.jenis_dokumen === "foto") || null,

      pembayaran:
        allDokumen.find((d) => d.jenis_dokumen === "bukti_pembayaran") || null,

      peserta: {
        jenis: data.jenis,
        program: data.program,
        nama_lengkap: peserta.nama_lengkap,
        no_kk: peserta.no_kk,
        nama_panggilan: peserta.nama_panggilan,
        no_akta: peserta.no_akta,
        tempat_lahir: peserta.tempat_lahir,
        agama: peserta.agama,
        tanggal_lahir: peserta.tanggal_lahir,
        no_telepon: peserta.no_telp,
        jenis_kelamin:
          peserta.jenis_kelamin === "P" ? "Perempuan" : "Laki-laki",
        anak_ke: peserta.anak_ke,
        kewarganegaraan: peserta.kewarganegaraan,
        jumlah_saudara: peserta.jumlah_saudara,
        nik: peserta.nik,
        bahasa_sehari_hari: peserta.bahasa,
      },

      alamat: {
        alamat_lengkap: peserta.alamat_domisili?.alamat_lengkap,
        rt: peserta.alamat_domisili?.rt,
        rw: peserta.alamat_domisili?.rw,
        desa_kelurahan: peserta.alamat_domisili?.desa,
        kecamatan: peserta.alamat_domisili?.kecamatan,
        kabupaten: peserta.alamat_domisili?.kabupaten,
        kode_pos: peserta.alamat_domisili?.kode_pos,
      },

      kesehatan: peserta.kesehatan || {},

      informasi: {
        tinggal_bersama: peserta.informasi?.tinggal_dengan,
        kendaraan_ke_sekolah: peserta.informasi?.kendaraan,
        jarak_ke_sekolah: peserta.informasi?.jarak_sekolah,
        waktu_tempuh: peserta.informasi?.waktu_tempuh,
        nama_sekolah_sebelumnya: peserta.informasi?.nama_sekolah,
        npsn_sekolah: peserta.informasi?.npsn,
        nisn: peserta.informasi?.nisn,
        bakat: peserta.informasi?.bakat,
        hobi: peserta.informasi?.hobi,
        cita_cita: peserta.informasi?.cita_cita,
      },

      ayah: {
        nama_ayah: ayah?.nama,
        tempat_lahir_ayah: ayah?.tempat_lahir,
        tanggal_lahir_ayah: ayah?.tanggal_lahir,
        nik_ayah: ayah?.nik,
        pendidikan_ayah: ayah?.pendidikan,
        pekerjaan_ayah: ayah?.pekerjaan,
        pendapatan_ayah: ayah?.pendapatan,
        no_hp_ayah: ayah?.no_hp,
        email_ayah: ayah?.email,
        alamat_kantor_ayah: ayah?.alamat_kantor,
      },

      ibu: {
        nama_ibu: ibu?.nama,
        tempat_lahir_ibu: ibu?.tempat_lahir,
        tanggal_lahir_ibu: ibu?.tanggal_lahir,
        nik_ibu: ibu?.nik,
        pendidikan_ibu: ibu?.pendidikan,
        pekerjaan_ibu: ibu?.pekerjaan,
        pendapatan_ibu: ibu?.pendapatan,
        no_hp_ibu: ibu?.no_hp,
        email_ibu: ibu?.email,
        alamat_kantor_ibu: ibu?.alamat_kantor,
      },
    };
  };

  const fetchDetail = async () => {
    try {
      loading.value = true;

      const res = await getPendaftaranById(id);
      console.log("fetchDetail", res);
      if (!res?.data) return;

      const mapped = mapPendaftaran(res.data);
      Object.assign(detail, mapped);
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    detail,
    form,
    fetchDetail,
  };
}
