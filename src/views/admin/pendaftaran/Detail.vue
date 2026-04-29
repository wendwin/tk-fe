<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg text-gray-700 font-medium dark:text-gray-400">
        Detail Pendaftaran
      </h1>

      <nav class="flex items-center text-sm text-slate-500 mr-5">
        <RouterLink
          :to="{ name: 'AdminPendaftaran' }"
          class="hover:text-slate-700 transition"
        >
          Home
        </RouterLink>

        <ChevronRight class="w-4 h-4 text-slate-400 mx-1" />

        <span class="text-slate-700 font-medium">Detail</span>
      </nav>
    </div>

    <div
      class="bg-white shadow-sm rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800 mb-6"
    >
      <div class="w-full rounded-lg overflow-hidden shadow bg-white">
        <div class="h-16 bg-slate-200"></div>

        <div class="px-6 pb-6 -mt-10">
          <div class="flex items-end justify-between">
            <div
              class="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden shadow"
            >
              <img
                v-if="detail.foto?.file_path"
                :src="detail.foto.file_path"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-purple-700 font-semibold text-xl">
                {{ detail.peserta.nama_lengkap?.charAt(0) }}
              </span>
            </div>

            <div class="">
              <p class="text-gray-400 text-sm">
                Daftar: {{ formatDateTimeID(detail.meta.tanggal_daftar) }}
              </p>
            </div>
          </div>

          <div class="mt-4">
            <h2 class="text-base font-semibold text-gray-800 mb-1">
              {{ detail.peserta.nama_lengkap || "-" }}
            </h2>

            <div
              class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div class="text-sm gap-3 space-y-1">
                <p class="text-gray-700">
                  Tahun Ajaran: {{ detail.meta.tahun_ajaran }}
                </p>
                <p class="text-gray-700">
                  No. Pendaftaran: {{ detail.meta.no_pendaftaran }}
                </p>
                <p class="text-gray-700">
                  {{ detail.meta.gelombang }}
                </p>

                <p class="text-gray-700">
                  Status:
                  <span
                    :class="[
                      'capitalize',
                      statusConfig(detail.meta.status).class,
                    ]"
                  >
                    {{ statusConfig(detail.meta.status).label }}
                  </span>
                </p>
              </div>

              <div
                class="flex flex-wrap items-center gap-2"
                v-if="
                  detail.meta.status_observasi === 'terjadwal' ||
                  detail.meta.status_observasi === 'hadir'
                "
              >
                <!-- <button
                  class="flex items-center gap-2 border border-slate-600 text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  <SquarePen class="w-4 h-4" />
                  Edit
                </button> -->

                <button
                  class="text-sm px-3 py-1 border rounded-lg text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition"
                >
                  Terima
                </button>

                <button
                  class="text-sm px-3 py-1 border rounded-lg text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                >
                  Tolak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white shadow-sm rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <div class="border-t px-6 pb-6">
        <div class="flex flex-wrap items-end justify-between">
          <div class="flex flex-wrap gap-2 md:gap-4 border-b mt-4">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              class="py-2 text-sm border-b-2 transition"
              :class="
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500'
              "
            >
              {{ tab }}
            </button>
          </div>

          <!-- tombol edit/simpan -->
          <div class="flex gap-2">
            <button
              v-if="!isEditPeserta"
              @click="startEdit"
              class="flex items-center gap-2 text-sm px-3 py-1.5 text-slate-600 border rounded-lg hover:bg-gray-100"
            >
              <SquarePen class="w-4 h-4" />
              Edit
            </button>

            <template v-else>
              <button
                @click="saveEdit"
                :disabled="loading"
                class="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {{ loading ? "Menyimpan..." : "Simpan" }}
              </button>
              <button
                @click="cancelEdit"
                class="text-sm px-3 py-1 border rounded-lg"
              >
                Batal
              </button>
            </template>
          </div>
        </div>

        <div class="mt-4">
          <!-- data peserta -->
          <div v-if="activeTab === 'Peserta'">
            <PesertaTab
              :detail="detail"
              :form="form"
              :isEditPeserta="isEditPeserta"
              :pesertaFields="pesertaFields"
              :alamatFields="alamatFields"
              :kesehatanFields="kesehatanFields"
              :informasiFields="informasiFields"
              @startEdit="startEdit"
              @saveEdit="saveEdit"
              @cancelEdit="cancelEdit"
            />
          </div>

          <div v-if="activeTab === 'Orang Tua'">
            <div class="mt-4">
              <!--  view mode -->
              <div v-if="!isEditPeserta" class="">
                <!-- orang tua -->
                <div class="mb-4">
                  <h3
                    class="font-medium text-gray-700 flex items-center gap-2 mb-4"
                  >
                    <Users class="w-5 h-5" /> Data Orangtua/Wali
                  </h3>

                  <h4 class="text-sm font-semibold mb-2">Ayah</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in orangTuaAyahFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ detail.ayah[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="">
                  <h4 class="text-sm font-semibold mb-2">IBu</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in orangTuaIbuFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ detail.ibu[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- edit mode -->
              <div v-else class="space-y-8">
                <div>
                  <div class="mb-4">
                    <h3
                      class="font-medium text-gray-700 mb-3 flex items-center gap-2"
                    >
                      <Users class="w-5 h-5" /> Data Orangtua/Wali
                    </h3>

                    <h4 class="text-sm font-semibold mb-2">Ayah</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        v-for="field in orangTuaAyahFields"
                        :key="field.key"
                        class="space-y-1"
                      >
                        <label class="text-sm text-gray-500">
                          {{ field.label }}
                        </label>
                        <input
                          v-model="form.ayah[field.key]"
                          class="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h4 class="text-sm font-semibold mb-2">Ibu</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        v-for="field in orangTuaIbuFields"
                        :key="field.key"
                        class="space-y-1"
                      >
                        <label class="text-sm text-gray-500">
                          {{ field.label }}
                        </label>
                        <input
                          v-model="form.ibu[field.key]"
                          class="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'Berkas'">
            <h3 class="font-medium text-gray-700">Berkas Pendaftaran</h3>
            <BerkasTab
              :detail="detail"
              :dokumen="detail.dokumen"
              :status="detail.meta.status"
              @verify="handleVerifyBerkas"
              @reject="handleRejectBerkas"
            />
          </div>
          <div v-if="activeTab === 'Pembayaran'">
            <h3 class="font-medium text-gray-700">Pembayaran</h3>
            <PembayaranTab
              :pembayaran="detail.pembayaran"
              :status="detail.meta.status_pembayaran"
              @verify="handleVerifyPembayaran"
              @reject="handleRejectPembayaran"
            />
          </div>
          <div v-if="activeTab === 'Asesmen'">
            <h3 class="font-medium text-gray-700">Hasil Asesmen</h3>
          </div>
          <div v-if="activeTab === 'Catatan'">
            <h3 class="font-medium text-gray-700">Catatan Admin</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import PesertaTab from "@/components/admin/PesertaTab.vue";
import BerkasTab from "@/components/admin/BerkasTab.vue";
import PembayaranTab from "@/components/admin/PembayaranTab.vue";
import {
  getPendaftaranById,
  verifyPendaftaran,
  rejectPendaftaran,
} from "@/lib/services/pendaftaranService";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import {
  updatePendaftaran,
  updateStatusPembayaran,
} from "@/lib/services/pendaftaranService";

import { statusConfig, paymentConfig } from "@/lib/utils/status";
import formatDateTimeID from "@/lib/utils/formatDateTimeID";
import {
  SquarePen,
  ChevronRight,
  School,
  User,
  MapPinCheck,
  MapPin,
  Hospital,
  Users,
  Info,
} from "lucide-vue-next";

const route = useRoute();
const id = route.params.id;
const loading = ref(false);
const activeTab = ref("Peserta");

const tabs = [
  "Peserta",
  "Orang Tua",
  "Berkas",
  "Pembayaran",
  "Asesmen",
  "Catatan",
];

/* field */
const pesertaFields = [
  { label: "Jenis", key: "jenis" },
  { label: "Program", key: "program" },
  { label: "Nama Lengkap", key: "nama_lengkap" },
  { label: "No. KK", key: "no_kk" },
  { label: "Nama Panggilan", key: "nama_panggilan" },
  { label: "No. Akta", key: "no_akta" },
  { label: "Tempat Lahir", key: "tempat_lahir" },
  { label: "Agama", key: "agama" },
  { label: "Tanggal Lahir", key: "tanggal_lahir" },
  { label: "No. Telepon", key: "no_telepon" },
  { label: "Jenis Kelamin", key: "jenis_kelamin" },
  { label: "Anak Ke-", key: "anak_ke" },
  { label: "Kewarganegaraan", key: "kewarganegaraan" },
  { label: "Jumlah Saudara", key: "jumlah_saudara" },
  { label: "NIK", key: "nik" },
  { label: "Bahasa Sehari-hari", key: "bahasa_sehari_hari" },
];

const alamatFields = [
  { label: "Alamat Lengkap", key: "alamat_lengkap" },
  { label: "RT", key: "rt" },
  { label: "RW", key: "rw" },
  { label: "Desa/Kelurahan", key: "desa_kelurahan" },
  { label: "Kecamatan", key: "kecamatan" },
  { label: "Kabupaten", key: "kabupaten" },
  { label: "Kode Pos", key: "kode_pos" },
];

const kesehatanFields = [
  { label: "Berat Badan (kg)", key: "berat_badan" },
  { label: "Tinggi Badan (cm)", key: "tinggi_badan" },
  { label: "Lingkar Kepala (cm)", key: "lingkar_kepala" },
  { label: "Golongan Darah", key: "golongan_darah" },
  { label: "Riwayat Penyakit", key: "riwayat_penyakit" },
  { label: "Alergi", key: "alergi" },
  { label: "Kebutuhan Khusus", key: "kebutuhan_khusus" },
];

const informasiFields = [
  { label: "Tinggal Bersama", key: "tinggal_bersama" },
  { label: "Kendaraan ke Sekolah", key: "kendaraan_ke_sekolah" },
  { label: "Jarak ke Sekolah (km)", key: "jarak_ke_sekolah" },
  { label: "Waktu Tempuh", key: "waktu_tempuh" },
  { label: "Nama Sekolah Sebelumnya", key: "nama_sekolah_sebelumnya" },
  { label: "NPSN Sekolah", key: "npsn_sekolah" },
  { label: "NISN", key: "nisn" },
  { label: "Bakat", key: "bakat" },
  { label: "Hobi", key: "hobi" },
  { label: "Cita-cita", key: "cita_cita" },
];

const orangTuaAyahFields = [
  // Ayah
  { label: "Nama Ayah", key: "nama_ayah" },
  { label: "Tempat Lahir Ayah", key: "tempat_lahir_ayah" },
  { label: "Tanggal Lahir Ayah", key: "tanggal_lahir_ayah" },
  { label: "NIK Ayah", key: "nik_ayah" },
  { label: "Pendidikan Ayah", key: "pendidikan_ayah" },
  { label: "Pekerjaan Ayah", key: "pekerjaan_ayah" },
  { label: "Pendapatan Ayah", key: "pendapatan_ayah" },
  { label: "No. HP Ayah", key: "no_hp_ayah" },
  { label: "Email Ayah", key: "email_ayah" },
  { label: "Alamat Kantor Ayah", key: "alamat_kantor_ayah" },
];

const orangTuaIbuFields = [
  { label: "Nama Ibu", key: "nama_ibu" },
  { label: "Tempat Lahir Ibu", key: "tempat_lahir_ibu" },
  { label: "Tanggal Lahir Ibu", key: "tanggal_lahir_ibu" },
  { label: "NIK Ibu", key: "nik_ibu" },
  { label: "Pendidikan Ibu", key: "pendidikan_ibu" },
  { label: "Pekerjaan Ibu", key: "pekerjaan_ibu" },
  { label: "Pendapatan Ibu", key: "pendapatan_ibu" },
  { label: "No. HP Ibu", key: "no_hp_ibu" },
  { label: "Email Ibu", key: "email_ibu" },
  { label: "Alamat Kantor Ibu", key: "alamat_kantor_ibu" },
];

const isEditPeserta = ref(false);
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

const BASE_FILE_URL = import.meta.env.VITE_BASE_FILE_URL;
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
      tanggal_daftar: data.tanggal_daftar,
      status: data.status,
      status_pembayaran: data.status_pembayaran,
      program: data.program,
      jenis: data.jenis,
      gelombang: data.gelombang?.nama,
      tahun_ajaran: data.tahun_ajaran?.label,
      status_observasi: data.status_observasi,
    },
    dokumen: allDokumen.filter((d) =>
      ["kk", "akta", "kia"].includes(d.jenis_dokumen),
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
      jenis_kelamin: peserta.jenis_kelamin === "P" ? "Perempuan" : "Laki-laki",
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
console.log(detail.meta.status);

const fetchDetail = async () => {
  try {
    const res = await getPendaftaranById(id);
    console.log("res", res);

    if (!res?.data) return;

    const mapped = mapPendaftaran(res.data);
    console.log("mapped", mapped);

    Object.assign(detail, mapped);
  } catch (err) {
    console.log(err);
  }
};

const buildPayload = () => {
  return {
    jenis: form.peserta.jenis,
    program: form.peserta.program,

    peserta: {
      nama_lengkap: form.peserta.nama_lengkap,
      nama_panggilan: form.peserta.nama_panggilan,
      tempat_lahir: form.peserta.tempat_lahir,
      tanggal_lahir: form.peserta.tanggal_lahir,
      jenis_kelamin: form.peserta.jenis_kelamin === "Perempuan" ? "P" : "L",
      kewarganegaraan: form.peserta.kewarganegaraan,
      nik: form.peserta.nik,
      no_kk: form.peserta.no_kk,
      no_akta: form.peserta.no_akta,
      agama: form.peserta.agama,
      no_telp: form.peserta.no_telepon,
      anak_ke: form.peserta.anak_ke,
      jumlah_saudara: form.peserta.jumlah_saudara,
      bahasa: form.peserta.bahasa_sehari_hari,

      alamat_domisili: {
        alamat_lengkap: form.alamat.alamat_lengkap,
        rt: form.alamat.rt,
        rw: form.alamat.rw,
        desa: form.alamat.desa_kelurahan,
        kecamatan: form.alamat.kecamatan,
        kabupaten: form.alamat.kabupaten,
        kode_pos: form.alamat.kode_pos,
      },

      alamat_kk: {
        alamat_lengkap: form.alamat.alamat_lengkap,
        rt: form.alamat.rt,
        rw: form.alamat.rw,
        desa: form.alamat.desa_kelurahan,
        kecamatan: form.alamat.kecamatan,
        kabupaten: form.alamat.kabupaten,
        kode_pos: form.alamat.kode_pos,
      },

      kesehatan: {
        berat_badan: form.kesehatan.berat_badan,
        tinggi_badan: form.kesehatan.tinggi_badan,
        lingkar_kepala: form.kesehatan.lingkar_kepala,
        golongan_darah: form.kesehatan.golongan_darah,
        riwayat_penyakit: form.kesehatan.riwayat_penyakit,
        alergi: form.kesehatan.alergi,
        kebutuhan_khusus: form.kesehatan.kebutuhan_khusus,
      },

      orang_tua: [
        {
          tipe: "ayah",
          nama: form.ayah.nama_ayah,
          tempat_lahir: form.ayah.tempat_lahir_ayah,
          tanggal_lahir: form.ayah.tanggal_lahir_ayah,
          nik: form.ayah.nik_ayah,
          pendidikan: form.ayah.pendidikan_ayah,
          pekerjaan: form.ayah.pekerjaan_ayah,
          pendapatan: form.ayah.pendapatan_ayah,
          alamat_kantor: form.ayah.alamat_kantor_ayah,
          no_hp: form.ayah.no_hp_ayah,
          email: form.ayah.email_ayah,
        },
        {
          tipe: "ibu",
          nama: form.ibu.nama_ibu,
          tempat_lahir: form.ibu.tempat_lahir_ibu,
          tanggal_lahir: form.ibu.tanggal_lahir_ibu,
          nik: form.ibu.nik_ibu,
          pendidikan: form.ibu.pendidikan_ibu,
          pekerjaan: form.ibu.pekerjaan_ibu,
          pendapatan: form.ibu.pendapatan_ibu,
          alamat_kantor: form.ibu.alamat_kantor_ibu,
          no_hp: form.ibu.no_hp_ibu,
          email: form.ibu.email_ibu,
        },
      ],

      informasi: {
        tinggal_dengan: form.informasi.tinggal_bersama,
        jarak_sekolah: form.informasi.jarak_ke_sekolah,
        waktu_tempuh: form.informasi.waktu_tempuh,
        kendaraan: form.informasi.kendaraan_ke_sekolah,
        nama_sekolah: form.informasi.nama_sekolah_sebelumnya,
        npsn: form.informasi.npsn_sekolah,
        nisn: form.informasi.nisn,
        bakat: form.informasi.bakat,
        hobi: form.informasi.hobi,
        cita_cita: form.informasi.cita_cita,
      },
    },
  };
};

const saveEdit = async () => {
  if (loading.value) return;

  try {
    loading.value = true;

    const payload = buildPayload();
    await updatePendaftaran(id, payload);

    Object.assign(detail.peserta, form.peserta);
    Object.assign(detail.alamat, form.alamat);
    Object.assign(detail.kesehatan, form.kesehatan);
    Object.assign(detail.informasi, form.informasi);
    Object.assign(detail.ayah, form.ayah);
    Object.assign(detail.ibu, form.ibu);

    isEditPeserta.value = false;

    showSuccess("Data berhasil diupdate");
  } catch (err) {
    showError(err.message || "Gagal update");
  } finally {
    loading.value = false;
  }
};

const handleVerifyBerkas = async () => {
  try {
    await verifyPendaftaran(detail.meta.id, "verified");
    detail.meta.status = "verified";
    showSuccess("Berhasil diverifikasi");
  } catch (err) {
    showError(err.message);
  }
};
const handleAccept = async () => {
  try {
    await verifyPendaftaran(detail.meta.id, "accepted");
    detail.meta.status = "accepted";
    showSuccess("Pendaftaran diterima");
  } catch (err) {
    showError(err.message);
  }
};

const handleRejectBerkas = async () => {
  try {
    await rejectPendaftaran(detail.meta.id, "rejected");
    detail.meta.status = "rejected";
    showSuccess("Berhasil ditolak");
  } catch (err) {
    showError(err.message);
  }
};

const handleVerifyPembayaran = async () => {
  try {
    await updateStatusPembayaran(detail.meta.id, "paid");
    detail.meta.status_pembayaran = "paid";
    showSuccess("Pembayaran diverifikasi");
  } catch (err) {
    showError(err.message);
  }
};

const handleRejectPembayaran = async () => {
  try {
    await updateStatusPembayaran(detail.meta.id, "failed");
    detail.meta.status_pembayaran = "failed";
    showSuccess("Pembayaran ditolak");
  } catch (err) {
    showError(err.message);
  }
};

const startEdit = () => {
  Object.assign(form.peserta, detail.peserta);
  Object.assign(form.alamat, detail.alamat);
  Object.assign(form.kesehatan, detail.kesehatan);
  Object.assign(form.informasi, detail.informasi);
  Object.assign(form.ayah, detail.ayah);
  Object.assign(form.ibu, detail.ibu);

  isEditPeserta.value = true;
};

const cancelEdit = () => {
  isEditPeserta.value = false;
};

onMounted(async () => {
  await fetchDetail();
});
</script>

<style lang="scss" scoped></style>
