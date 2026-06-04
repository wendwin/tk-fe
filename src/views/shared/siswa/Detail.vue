<template>
  <div>
    <DetailLayout
      title="Detail Siswa"
      :back-route-name="backRouteName"
      breadcrumb-label="Siswa"
      :detail="detail"
      :form="form"
      :tabs="tabs"
      :can-edit="false"
      :is-edit-peserta="false"
      :loading="loading"
      :peserta-fields="pesertaFields"
      :alamat-fields="alamatFields"
      :kesehatan-fields="kesehatanFields"
      :informasi-fields="informasiFields"
      :orang-tua-ayah-fields="orangTuaAyahFields"
      :orang-tua-ibu-fields="orangTuaIbuFields"
      :show-created-at="false"
    >
      <template #meta-info>
        <p class="text-gray-700">NISN: {{ detail.siswa.nisn || "-" }}</p>
        <p class="text-gray-700">
          Tanggal Masuk: {{ detail.siswa.tanggal_masuk || "-" }}
        </p>
        <p class="text-gray-700">
          Tahun Ajaran: {{ detail.meta.tahun_ajaran || "-" }}
        </p>
        <p class="text-gray-700">
          Kelas: {{ detail.siswa.kelas || "Belum ada kelas" }}
        </p>
        <p class="text-gray-700">
          Status Siswa:
          <span class="capitalize text-emerald-600">
            {{ detail.siswa.status || "-" }}
          </span>
        </p>
      </template>

      <template #header-action>
        <button
          @click="openEditSiswa = true"
          class="flex items-center gap-2 text-sm px-3 py-1.5 text-slate-600 border rounded-lg hover:bg-gray-100"
        >
          <SquarePen class="w-4 h-4" />
          Edit Data Siswa
        </button>
      </template>

      <template #tab-content="{ activeTab }">
        <AsesmenView v-if="activeTab === 'Asesmen'" :data="hasilAsesmen" />

        <ObservasiForm
          v-else-if="activeTab === 'Observasi' && detail.meta.pendaftaran_id"
          :pendaftaran-id="detail.meta.pendaftaran_id"
          :umur="detail.meta.umur"
          :readonly="true"
        />
      </template>
    </DetailLayout>
    <EditSiswaModal
      :open="openEditSiswa"
      :siswa="detail"
      @close="openEditSiswa = false"
      @updated="handleUpdatedSiswa"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { SquarePen } from "lucide-vue-next";

import DetailLayout from "@/components/admin/pendaftaran/DetailLayout.vue";
import AsesmenView from "@/components/admin/AsesmenView.vue";
import ObservasiForm from "@/components/admin/observasi/ObservasiForm.vue";
import EditSiswaModal from "@/components/admin/common/EditSiswaModal.vue";

import { getSiswaById } from "@/lib/services/siswaService";
import { getJawabanAsesmen } from "@/lib/services/asesmenService";

import {
  pesertaFields,
  alamatFields,
  kesehatanFields,
  informasiFields,
  orangTuaAyahFields,
  orangTuaIbuFields,
} from "@/lib/constants/pendaftaranFields";

import { showError } from "@/lib/utils/toast";

const route = useRoute();
const id = route.params.id;

const openEditSiswa = ref(false);
const tabs = ["Peserta Didik", "Orang Tua", "Asesmen", "Observasi"];

const loading = ref(false);
const jawaban = ref([]);

const backRouteName = computed(() => {
  return route.path.startsWith("/dashboard/guru") ? "GuruSiswa" : "AdminSiswa";
});

const detail = reactive({
  meta: {},
  siswa: {},
  foto: null,
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

const mapOrangTua = (orangTua = [], tipe) => {
  const data = orangTua.find((item) => item.tipe === tipe);

  return {
    [`nama_${tipe}`]: data?.nama,
    [`tempat_lahir_${tipe}`]: data?.tempat_lahir,
    [`tanggal_lahir_${tipe}`]: data?.tanggal_lahir,
    [`nik_${tipe}`]: data?.nik,
    [`pendidikan_${tipe}`]: data?.pendidikan,
    [`pekerjaan_${tipe}`]: data?.pekerjaan,
    [`pendapatan_${tipe}`]: data?.pendapatan,
    [`no_hp_${tipe}`]: data?.no_hp,
    [`email_${tipe}`]: data?.email,
    [`alamat_kantor_${tipe}`]: data?.alamat_kantor,
  };
};

const mapSiswa = (data) => {
  const peserta = data.peserta || {};
  const pendaftaran = data.pendaftaran || {};
  const kelasAktif = data.kelas_aktif || {};

  return {
    meta: {
      id: data.id,
      pendaftaran_id: pendaftaran.id,
      umur: data.umur,
      tahun_ajaran: pendaftaran.tahun_ajaran?.label,
      no_pendaftaran: pendaftaran.no_pendaftaran,
      gelombang: pendaftaran.gelombang?.nama,
      jenis: pendaftaran.jenis,
      program: pendaftaran.program,
      status: pendaftaran.status,
    },

    siswa: {
      nisn: data.nisn,
      tanggal_masuk: data.tanggal_masuk,
      status: data.status,
      kelas: kelasAktif?.kelas?.nama,
    },

    peserta: {
      jenis: pendaftaran.jenis,
      program: pendaftaran.program,
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
      desa_kelurahan: peserta.alamat_domisili?.kelurahan,
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

    ayah: mapOrangTua(peserta.orang_tua, "ayah"),
    ibu: mapOrangTua(peserta.orang_tua, "ibu"),
  };
};

const fetchDetail = async () => {
  try {
    loading.value = true;

    const res = await getSiswaById(id);
    console.log("siswaaaaa", res);

    const mapped = mapSiswa(res.data);
    console.log("mapped", mapped);
    Object.assign(detail, mapped);
  } catch (err) {
    showError(err.message || "Gagal memuat detail siswa");
  } finally {
    loading.value = false;
  }
};

const fetchAsesmen = async () => {
  try {
    if (!detail.meta.pendaftaran_id) return;

    const resJawaban = await getJawabanAsesmen(detail.meta.pendaftaran_id);

    jawaban.value = resJawaban.data?.data || resJawaban.data || [];
  } catch (err) {
    jawaban.value = [];
    showError(err.message || "Gagal memuat data asesmen");
  }
};

const hasilAsesmen = computed(() => {
  return jawaban.value.map((item, index) => ({
    id: item.id,
    urutan: index + 1,
    pertanyaan: item.pertanyaan,
    jawaban: item.jawaban || "-",
  }));
});

const handleUpdatedSiswa = async () => {
  openEditSiswa.value = false;
  await fetchDetail();
};

onMounted(async () => {
  await fetchDetail();
  await fetchAsesmen();
});
</script>
