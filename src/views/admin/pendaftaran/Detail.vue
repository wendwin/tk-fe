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

        <span class="text-slate-700 font-medium"> Detail </span>
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
              class="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center text-purple-700 font-semibold text-xl shadow"
            >
              SA
            </div>

            <div class="">
              <p class="text-gray-400 text-sm">Daftar: 12 Apr 2025</p>
            </div>
          </div>

          <div class="mt-4">
            <h2 class="text-base font-semibold text-gray-800">Siti Aisya</h2>

            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div class="text-sm flex gap-3">
                <span class="text-gray-700">PSB-2025-TK-001</span>
                <span class="text-gray-700">Terverifikasi</span>
              </div>

              <div class="flex flex-wrap items-center gap-2">
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
            <!-- <button
                  v-if="!isEditPeserta"
                  @click="startEdit"
                  class="flex items-center gap-2 border border-slate-600 text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  <SquarePen class="w-4 h-4" />
                  Edit
                </button> -->
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
                class="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg"
              >
                Simpan
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
            <div class="mt-4">
              <!-- view mode -->
              <div v-if="!isEditPeserta" class="">
                <!-- peserta -->
                <div class="">
                  <h3
                    class="font-medium text-gray-700 flex items-center gap-2 mb-4"
                  >
                    <User class="w-5 h-5" /> Data Peserta
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in pesertaFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ dataPeserta[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- alamat domisili -->
                <div class="">
                  <h3
                    class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <MapPinCheck class="w-5 h-5" /> Alamat Domisili
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in alamatFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ dataAlamat[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- alamat rumah -->
                <div class="">
                  <h3
                    class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <MapPin class="w-5 h-5" /> Alamat Rumah
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in alamatFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ dataAlamat[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- kesehatan -->
                <div class="">
                  <h3
                    class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <Hospital class="h-5 w-5" /> Data Kesehatan Anak
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in kesehatanFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ dataKesehatan[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- informasi -->
                <div class="">
                  <h3
                    class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <Info class="h-5 w-5" /> Informasi Lain-lain
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in informasiFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <p class="text-sm text-gray-500">
                        {{ field.label }}
                      </p>
                      <p class="text-sm text-gray-700 font-medium">
                        {{ dataInformasi[field.key] || "-" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- edit mode -->
              <div v-else class="space-y-8">
                <!-- peserta -->
                <div>
                  <h3 class="font-medium text-gray-700 mb-3">Data Peserta</h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in pesertaFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <label class="text-sm text-gray-500">
                        {{ field.label }}
                      </label>
                      <input
                        v-model="formPeserta[field.key]"
                        class="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <!-- alamat domisili -->
                <div>
                  <h3
                    class="font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <MapPinCheck class="w-5 h-5" /> Alamat Domisili
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in alamatFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <label class="text-sm text-gray-500">
                        {{ field.label }}
                      </label>
                      <input
                        v-model="formAlamat[field.key]"
                        class="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <!-- alamat rumah -->
                <div>
                  <h3
                    class="font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <MapPin class="w-5 h-5" /> Alamat Rumah
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in alamatFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <label class="text-sm text-gray-500">
                        {{ field.label }}
                      </label>
                      <input
                        v-model="formAlamat[field.key]"
                        class="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <!-- kesehatan -->
                <div>
                  <h3
                    class="font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <Hospital class="w-5 h-5" /> Data Kesehatan Anak
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in kesehatanFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <label class="text-sm text-gray-500">
                        {{ field.label }}
                      </label>
                      <input
                        v-model="formKesehatan[field.key]"
                        class="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <!-- informasi -->
                <div>
                  <h3
                    class="font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <Info class="w-5 h-5" /> Informasi Lain-lain
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="field in informasiFields"
                      :key="field.key"
                      class="space-y-1"
                    >
                      <label class="text-sm text-gray-500">
                        {{ field.label }}
                      </label>
                      <input
                        v-model="formInformasi[field.key]"
                        class="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        {{ dataAyah[field.key] || "-" }}
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
                        {{ dataIbu[field.key] || "-" }}
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
                          v-model="formOrangTuaAyah[field.key]"
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
                          v-model="formOrangTuaIbu[field.key]"
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
          </div>
          <div v-if="activeTab === 'Pembayaran'">
            <h3 class="font-medium text-gray-700">Pembayaran</h3>
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
import { ref, reactive } from "vue";
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

const tabs = [
  "Peserta",
  "Orang Tua",
  "Berkas",
  "Pembayaran",
  "Asesmen",
  "Catatan",
];
const activeTab = ref("Peserta");

/* data */
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

const dataPeserta = reactive({
  jenis: "TK",
  program: "Reguler",
  nama_lengkap: "Siti Aisyah Putri",
  no_kk: "3322114455667788",
  nama_panggilan: "Aisyah",
  no_akta: "1234567890",
  tempat_lahir: "Semarang",
  agama: "Islam",
  tanggal_lahir: "2019-03-16",
  no_telepon: "081234567890",
  jenis_kelamin: "Perempuan",
  anak_ke: 2,
  kewarganegaraan: "Indonesia",
  jumlah_saudara: 3,
  nik: "3322111603190001",
  bahasa_sehari_hari: "Indonesia",
});

const dataAlamat = reactive({
  alamat_lengkap: "Jl. Raya Semarang No. 1 Perumahan Semarang Baru",
  rt: "01",
  rw: "01",
  desa_kelurahan: "Semarang Baru",
  kecamatan: "Semarang Selatan",
  kabupaten: "Kota Semarang",
  kode_pos: "50151",
});

const dataKesehatan = reactive({
  berat_badan: 18,
  lingkar_kepala: 50,
  golongan_darah: "O",
  riwayat_penyakit: "Tidak ada",
  alergi: "Tidak ada",
  kebutuhan_khusus: "Tidak ada",
});

const dataInformasi = reactive({
  tinggal_bersama: "Orang Tua",
  kendaraan_ke_sekolah: "Diantar Orang Tua",
  jarak_ke_sekolah: 3,
  waktu_tempuh: "10 menit",
  pernah_sekolah_sebelumnya: true,
  nama_sekolah_sebelumnya: "TK Melati",
  npsn_sekolah: "20345678",
  nisn: "0098765432",
  bakat: "Menggambar",
  hobi: "Mewarnai",
  cita_cita: "Dokter",
});

const dataAyah = reactive({
  nama_ayah: "Budi Santoso",
  tempat_lahir_ayah: "Semarang",
  tanggal_lahir_ayah: "1985-06-12",
  nik_ayah: "3322111206850001",
  pendidikan_ayah: "S1",
  pekerjaan_ayah: "Karyawan Swasta",
  pendapatan_ayah: "5.000.000 - 7.000.000",
  no_hp_ayah: "081234567891",
  email_ayah: "budi.santoso@gmail.com",
  alamat_kantor_ayah: "Jl. Industri No. 10, Semarang",
});

const dataIbu = reactive({
  nama_ibu: "Siti Aminah",
  tempat_lahir_ibu: "Semarang",
  tanggal_lahir_ibu: "1988-09-20",
  nik_ibu: "3322112009880002",
  pendidikan_ibu: "SMA",
  pekerjaan_ibu: "Ibu Rumah Tangga",
  pendapatan_ibu: "Tidak Berpenghasilan",
  no_hp_ibu: "081234567892",
  email_ibu: "siti.aminah@gmail.com",
  alamat_kantor_ibu: "-",
});

const isEditPeserta = ref(false);
const formPeserta = reactive({});
const formAlamat = reactive({});
const formKesehatan = reactive({});
const formInformasi = reactive({});
const formOrangTuaAyah = reactive({});
const formOrangTuaIbu = reactive({});

const startEdit = () => {
  Object.assign(formPeserta, dataPeserta);
  Object.assign(formAlamat, dataAlamat);
  Object.assign(formKesehatan, dataKesehatan);
  Object.assign(formInformasi, dataInformasi);
  Object.assign(formOrangTuaAyah, dataAyah);
  Object.assign(formOrangTuaIbu, dataIbu);

  isEditPeserta.value = true;
};

const saveEdit = () => {
  Object.assign(dataPeserta, formPeserta);
  Object.assign(dataAlamat, formAlamat);
  Object.assign(dataKesehatan, formKesehatan);
  Object.assign(dataInformasi, formInformasi);
  Object.assign(dataAyah, formOrangTuaAyah);
  Object.assign(dataIbu, formOrangTuaIbu);

  isEditPeserta.value = false;
};
const cancelEdit = () => {
  isEditPeserta.value = false;
};
</script>

<style lang="scss" scoped></style>
