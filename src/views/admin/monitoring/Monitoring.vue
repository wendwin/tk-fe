<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h1 class="text-2xl font-medium text-gray-800">Monitoring Mingguan</h1>

      <p v-if="isAdmin" class="text-sm text-gray-500 mt-1">
        Pantau histori monitoring mingguan yang dibuat oleh guru pada setiap
        kelas.
      </p>

      <p v-else class="text-sm text-gray-500 mt-1">
        Isi data Perencanaan Pembelajaran Mendalam mingguan untuk kelas.
      </p>

      <div class="mt-4 grid md:grid-cols-3 gap-4">
        <div>
          <p class="text-sm text-gray-500">Tahun Ajaran</p>
          <p class="font-medium text-gray-800">
            {{ tahunAjaranAktif?.label || "-" }}
          </p>
        </div>

        <div>
          <div>
            <p class="text-sm text-gray-500">Kelas</p>
            <p class="font-medium text-gray-800">
              {{ formatKelas(selectedKelas?.kelas) }}
            </p>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-500">Peran</p>
          <p class="font-medium capitalize text-gray-800">
            {{ selectedKelas?.peran || "-" }}
          </p>
        </div>
      </div>
    </div>

    <section class="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 class="text-lg font-medium text-gray-800 mb-4">
        Daftar Monitoring Mingguan
      </h2>

      <div class="flex flex-col md:flex-row gap-3 mb-4">
        <select
          v-if="isAdmin"
          v-model="filterTahunAjaranId"
          @change="loadMonitoring"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
        >
          <option value="">Semua Tahun Ajaran</option>
          <option
            v-for="tahun in tahunAjaranList"
            :key="tahun.id"
            :value="tahun.id"
          >
            {{ tahun.label }}
          </option>
        </select>

        <select
          v-if="isAdmin"
          v-model="filterKelasId"
          @change="loadMonitoring"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
        >
          <option value="">Semua Kelas</option>
          <option
            v-for="kelas in kelasOptions"
            :key="kelas.id"
            :value="kelas.id"
          >
            {{ formatKelas(kelas) }}
          </option>
        </select>
        <select
          v-model="filterBulan"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
        >
          <option value="">Semua Bulan</option>

          <option
            v-for="bulan in bulanFilterOptions"
            :key="bulan"
            :value="bulan"
          >
            {{ bulan }}
          </option>
        </select>

        <select
          v-model="filterSemester"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
        >
          <option value="">Semua Semester</option>
          <option value="ganjil">Ganjil</option>
          <option value="genap">Genap</option>
        </select>

        <select
          v-model="filterStatus"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
        >
          <option value="">Semua Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button
          v-if="hasActiveFilter"
          type="button"
          @click="resetFilter"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      <div v-if="monitoringList.length === 0" class="text-sm text-gray-500">
        Belum ada monitoring mingguan untuk kelas ini.
      </div>

      <div
        v-else-if="filteredMonitoringList.length === 0"
        class="text-sm text-gray-500"
      >
        Tidak ada monitoring mingguan yang sesuai dengan filter.
      </div>

      <div
        v-else-if="filteredMonitoringList.length > 0"
        class="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div
          v-for="item in filteredMonitoringList"
          :key="item.id"
          class="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition"
        >
          <div class="flex items-center justify-between">
            <span
              class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
            >
              {{
                getNamaBulanMonitoring(item.tanggal_mulai, item.tanggal_selesai)
              }}
              - Minggu {{ item.minggu }}
            </span>

            <span
              class="text-xs px-2 py-1 rounded-full"
              :class="
                item.status === 'published'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-amber-50 text-amber-600'
              "
            >
              {{ item.status === "published" ? "Published" : "Draft" }}
            </span>
          </div>

          <h3 class="font-medium text-gray-800 mt-3 capitalize">
            {{ item.topik }}
          </h3>

          <p class="text-sm text-gray-500 capitalize">
            {{ item.sub_topik }}
          </p>

          <p class="text-xs text-gray-400 mt-2">
            {{ formatPeriodeID(item.tanggal_mulai, item.tanggal_selesai) }}
          </p>

          <div class="mt-4 pt-1 border-t border-gray-100">
            <!-- <p class="text-xs text-gray-400 uppercase tracking-wide">
              Progress Monitoring
            </p> -->

            <div
              class="flex items-center gap-2"
              :class="isAdmin ? 'justify-between' : 'justify-end'"
            >
              <p v-if="isAdmin" class="text-xs text-gray-500 mt-1">
                {{ formatKelas(item.kelas) }}
              </p>
              <span class="text-sm font-medium text-gray-700 text-gray-700">
                {{ item.total_selesai || 0 }} /
                {{ item.total_siswa || 0 }} siswa
              </span>

              <!-- <span class="text-xs text-gray-500">
                {{
                  item.total_siswa
                    ? Math.round((item.total_selesai / item.total_siswa) * 100)
                    : 0
                }}%
              </span> -->
            </div>

            <!-- <div class="w-full h-2 bg-gray-100 rounded-full mt-2">
              <div
                class="h-2 bg-blue-500 rounded-full"
                :style="{
                  width: `${
                    item.total_siswa
                      ? (item.total_selesai / item.total_siswa) * 100
                      : 0
                  }%`,
                }"
              />
            </div> -->
          </div>

          <div class="mt-3 flex gap-2">
            <router-link
              :to="{
                name: 'AdminMonitoringMingguanDetail',
                params: { id: item.id },
              }"
              class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 text-center text-gray-700"
            >
              Detail
            </router-link>

            <button
              v-if="item.status === 'draft'"
              type="button"
              @click="handlePublish(item)"
              :disabled="
                (item.total_siswa || 0) === 0 ||
                (item.total_selesai || 0) < (item.total_siswa || 0)
              "
              class="px-3 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </section>

    <div ref="formAnchor"></div>

    <form
      v-if="isGuru"
      @submit.prevent="handleSubmit"
      class="bg-white rounded-2xl border border-gray-200 p-6 space-y-6"
    >
      <h2 class="text-lg font-medium text-gray-800 mb-4">
        {{ isEditMode ? "Edit Monitoring" : "Tambah Monitoring" }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div>
          <label class="text-sm font-medium text-gray-700 text-gray-700"
            >Semester <span class="text-red-500">*</span></label
          >

          <select
            v-model="form.semester"
            required
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full rounded-lg px-3 py-2 text-sm',
              errors.semester
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          >
            <option value="">Pilih Semester</option>
            <option value="ganjil">Ganjil</option>
            <option value="genap">Genap</option>
          </select>

          <p v-if="errors.semester" class="mt-1 text-xs text-red-500">
            {{ errors.semester[0] }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700"
            >Minggu <span class="text-red-500">*</span></label
          >

          <select
            v-model="form.minggu"
            required
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full rounded-lg px-3 py-2 text-sm',
              errors.minggu
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          >
            <option value="">Pilih Minggu</option>
            <option value="1">Minggu 1</option>
            <option value="2">Minggu 2</option>
            <option value="3">Minggu 3</option>
            <option value="4">Minggu 4</option>
          </select>

          <p v-if="errors.minggu" class="mt-1 text-xs text-red-500">
            {{ errors.minggu[0] }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700"
            >Topik <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.topik"
            type="text"
            required
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full rounded-lg px-3 py-2 text-sm',
              errors.topik
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          />
          <p v-if="errors.topik" class="mt-1 text-xs text-red-500">
            {{ errors.topik[0] }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700"
            >Sub Topik <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.sub_topik"
            type="text"
            required
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full rounded-lg px-3 py-2 text-sm',
              errors.sub_topik
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          />

          <p v-if="errors.sub_topik" class="mt-1 text-xs text-red-500">
            {{ errors.sub_topik[0] }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">
            Tanggal Mulai <span class="text-red-500">*</span>
          </label>

          <div class="relative">
            <flat-pickr
              v-model="form.tanggal_mulai"
              :config="flatpickrConfig"
              placeholder="Pilih tanggal mulai"
              class="w-full rounded-lg px-3 py-2 pr-10 text-sm"
              :class="
                errors.tanggal_mulai
                  ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                  : 'border border-gray-200'
              "
            />

            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            >
              <Calendar class="w-4 h-4" />
            </span>
          </div>

          <p v-if="errors.tanggal_mulai" class="mt-1 text-xs text-red-500">
            {{ errors.tanggal_mulai[0] }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">
            Tanggal Selesai <span class="text-red-500">*</span>
          </label>

          <div class="relative">
            <flat-pickr
              v-model="form.tanggal_selesai"
              :config="flatpickrConfig"
              placeholder="Pilih tanggal selesai"
              class="w-full rounded-lg px-3 py-2 pr-10 text-sm"
              :class="
                errors.tanggal_selesai
                  ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                  : 'border border-gray-200'
              "
            />

            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            >
              <Calendar class="w-4 h-4" />
            </span>
          </div>

          <p v-if="errors.tanggal_selesai" class="mt-1 text-xs text-red-500">
            {{ errors.tanggal_selesai[0] }}
          </p>
        </div>
        <!-- <div
          v-if="form.tanggal_mulai && form.minggu"
          class="md:col-span-2 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700"
        >
          Monitoring akan dibuat untuk bulan
          <span class="font-medium">
            {{
              getNamaBulanMonitoring(form.tanggal_mulai, form.tanggal_selesai)
            }}
          </span>
        </div> -->
      </div>

      <div
        v-if="detailLocked"
        class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
      >
        Detail TP, KKTP, kegiatan, dan asesmen awal dikunci karena monitoring
        siswa sudah mulai diisi. Anda masih dapat mengubah informasi umum
        seperti topik, sub topik, minggu, dan tanggal.
      </div>

      <section class="space-y-4 mb-10">
        <div class="flex justify-between items-center">
          <h2 class="font-medium text-gray-800">Tujuan Pembelajaran & KKTP</h2>

          <button
            type="button"
            v-if="!detailLocked"
            @click="addTP"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah TP
          </button>
        </div>

        <div
          v-for="(tp, tpIndex) in form.tp"
          :key="tpIndex"
          class="border border-gray-200 rounded-xl p-4 space-y-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Elemen {{ tpIndex + 1 }}
                <span class="text-red-500">*</span></label
              >

              <select
                v-model="tp.elemen"
                required
                :disabled="detailLocked"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                :class="[
                  'w-full rounded-lg px-3 py-2 text-sm',
                  errors.tp && errors.tp[tpIndex] && errors.tp[tpIndex].elemen
                    ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                    : 'border border-gray-200',
                ]"
              >
                <option value="">Pilih Elemen</option>
                <option value="kesyuhadaan">Kesyuhadaan</option>
                <option value="nabp">NABP</option>
                <option value="jd">Jati Diri</option>
                <option value="ddlmstrs">DDLMSTRS</option>
              </select>
              <p
                v-if="getError(`tp.${tpIndex}.elemen`)"
                class="mt-1 text-xs text-red-500"
              >
                {{ getError(`tp.${tpIndex}.elemen`) }}
              </p>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Tujuan Pembelajaran <span class="text-red-500">*</span></label
              >

              <input
                v-model="tp.tujuan"
                type="text"
                required
                :disabled="detailLocked"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                :class="[
                  'w-full rounded-lg px-3 py-2 text-sm',
                  errors.tp && errors.tp[tpIndex] && errors.tp[tpIndex].tujuan
                    ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                    : 'border border-gray-200',
                ]"
              />

              <p
                v-if="getError(`tp.${tpIndex}.tujuan`)"
                class="mt-1 text-xs text-red-500"
              >
                {{ getError(`tp.${tpIndex}.tujuan`) }}
              </p>
            </div>
          </div>

          <div class="space-y-2 mt-8">
            <div class="flex justify-between items-center">
              <p class="text-sm font-medium text-gray-700">
                KKTP <span class="text-red-500">*</span>
              </p>

              <button
                type="button"
                @click="addKKTP(tpIndex)"
                class="flex items-center gap-1 justify-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus class="w-4 h-4" /> Tambah KKTP
              </button>
            </div>

            <div
              v-for="(kktp, kktpIndex) in tp.kktp"
              :key="kktpIndex"
              class="flex gap-2 items-start"
            >
              <div class="flex-1">
                <input
                  v-model="kktp.deskripsi"
                  required
                  :disabled="detailLocked"
                  type="text"
                  placeholder="Deskripsi KKTP"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  :class="[
                    'w-full rounded-lg px-3 py-2 text-sm',
                    errors.tp &&
                    errors.tp[tpIndex] &&
                    errors.tp[tpIndex].kktp &&
                    errors.tp[tpIndex].kktp[kktpIndex] &&
                    errors.tp[tpIndex].kktp[kktpIndex].deskripsi
                      ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                      : 'border border-gray-200',
                  ]"
                />

                <p
                  v-if="getError(`tp.${tpIndex}.kktp.${kktpIndex}.deskripsi`)"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError(`tp.${tpIndex}.kktp.${kktpIndex}.deskripsi`) }}
                </p>
              </div>

              <button
                type="button"
                v-if="!detailLocked"
                @click="removeKKTP(tpIndex, kktpIndex)"
                class="px-2 h-10 rounded-lg bg-white border border-red-200 text-red-600 text-sm hover:bg-red-100"
              >
                <Minus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button
              type="button"
              v-if="!detailLocked"
              @click="removeTP(tpIndex)"
              class="flex items-center gap-2 text-sm px-3 py-1.5 text-slate-600 border rounded-lg hover:bg-gray-100"
            >
              Hapus TP
            </button>
          </div>
        </div>
      </section>

      <section class="space-y-4 mb-10">
        <div class="flex justify-between items-center">
          <h2 class="font-medium text-gray-800">Kegiatan</h2>

          <button
            type="button"
            v-if="!detailLocked"
            @click="addKegiatan"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah Kegiatan
          </button>
        </div>

        <div
          v-for="(item, index) in form.kegiatan"
          :key="index"
          class="flex gap-3 items-end"
        >
          <div class="grid flex-1 grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Kegiatan {{ index + 1 }}
                <span class="text-red-500">*</span></label
              >
              <input
                v-model="item.nama"
                required
                type="text"
                :disabled="detailLocked"
                placeholder="Nama kegiatan"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                :class="[
                  'w-full rounded-lg px-3 py-2 text-sm',
                  errors.kegiatan &&
                  errors.kegiatan[index] &&
                  errors.kegiatan[index].nama
                    ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                    : 'border border-gray-200',
                ]"
              />

              <p
                v-if="getError(`kegiatan.${index}.nama`)"
                class="mt-1 text-xs text-red-500"
              >
                {{ getError(`kegiatan.${index}.nama`) }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Media/Bahan</label
              >
              <input
                v-model="item.media"
                :disabled="detailLocked"
                type="text"
                placeholder="Media / bahan"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            v-if="!detailLocked"
            @click="removeKegiatan(index)"
            class="shrink-0 h-10 w-10 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-100 flex items-center justify-center"
          >
            <Minus class="w-4 h-4" />
          </button>
        </div>
      </section>

      <section class="space-y-3 mb-10">
        <h2 class="font-medium text-gray-800">Asesmen Awal</h2>

        <div class="">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Teknik Asesmen <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.asesmen_awal.teknik"
            required
            :disabled="detailLocked"
            type="text"
            placeholder="Teknik asesmen"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full rounded-lg px-3 py-2 text-sm',
              errors.asesmen_awal && errors.asesmen_awal.teknik
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          />
          <p
            v-if="getError('asesmen_awal.teknik')"
            class="mt-1 text-xs text-red-500"
          >
            {{ getError("asesmen_awal.teknik") }}
          </p>
        </div>

        <div class="">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Rancangan Kegiatan <span class="text-red-500">*</span></label
          >
          <textarea
            required
            v-model="form.asesmen_awal.rancangan_kegiatan"
            :disabled="detailLocked"
            placeholder="Rancangan kegiatan"
            class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm',
              errors.asesmen_awal && errors.asesmen_awal.rancangan_kegiatan
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          />
          <p
            v-if="getError('asesmen_awal.rancangan_kegiatan')"
            class="text-xs text-red-500"
          >
            {{ getError("asesmen_awal.rancangan_kegiatan") }}
          </p>
        </div>

        <div class="">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Hasil Asesmen</label
          >
          <textarea
            v-model="form.asesmen_awal.hasil"
            :disabled="detailLocked"
            placeholder="Hasil asesmen awal"
            class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
            :class="[
              'w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm',
              errors.asesmen_awal && errors.asesmen_awal.hasil
                ? 'border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500'
                : 'border border-gray-200',
            ]"
          />
        </div>
      </section>

      <div class="flex justify-end gap-3">
        <button
          v-if="isEditMode"
          type="button"
          @click="cancelEdit"
          class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
        >
          Batal Edit
        </button>

        <button
          v-else
          type="button"
          @click="resetForm"
          class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
        >
          Reset
        </button>

        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onActivated, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";

import {
  createMonitoringMingguan,
  getMonitoringMingguan,
  getMonitoringMingguanById,
  updateMonitoringMingguan,
  publishMonitoringMingguan,
} from "@/lib/services/monitoringService";
import { getMyGuruKelas } from "@/lib/services/guruKelasService";
import { getAllTahunAjaran } from "@/lib/services/tahunAjaranService";
import { formatPeriodeID } from "@/lib/utils/formatDateTimeID";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { Minus, Plus, Calendar } from "lucide-vue-next";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

const flatpickrConfig = {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "d F Y",
  allowInput: true,
};

const formAnchor = ref(null);

const auth = useAuthStore();
const isAdmin = computed(() => auth.role === "admin");
const isGuru = computed(() => auth.role === "guru");

const loading = ref(false);
const route = useRoute();
const router = useRouter();

const editId = ref(null);
const isEditMode = computed(() => !!editId.value);

const tahunAjaranAktif = ref(null);

const kelasGuru = ref([]);

const selectedKelas = ref(null);

const isMultiKelas = computed(() => {
  return kelasGuru.value.length > 1;
});

const monitoringList = ref([]);

const errors = ref({});

const filterBulan = ref("");
const filterSemester = ref("");
const filterStatus = ref("");

const hasActiveFilter = computed(() => {
  return (
    filterBulan.value ||
    filterSemester.value ||
    filterStatus.value ||
    filterKelasId.value ||
    filterTahunAjaranId.value
  );
});

const resetFilter = async () => {
  filterBulan.value = "";
  filterSemester.value = "";
  filterStatus.value = "";
  filterKelasId.value = "";
  filterTahunAjaranId.value = tahunAjaranAktif.value?.id || "";

  await loadMonitoring();
};

const getError = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], errors.value)?.[0];
};

const formatKelas = (kelas) => {
  if (!kelas) return "-";

  const jenjang = kelas.jenjang ? kelas.jenjang.toUpperCase() : "";
  const kelompok = kelas.kelompok ? kelas.kelompok.toUpperCase() : "";
  const nama = kelas.nama || "";

  if (kelas.jenjang === "kb") return nama;
  if (kelompok && nama) return `${jenjang}-${kelompok} ${nama}`;
  if (kelompok) return `${jenjang}-${kelompok}`;

  return nama || jenjang || "-";
};

const getBulanSaatIni = () => {
  return getNamaBulanMonitoring(new Date(), new Date());
};

const getNamaBulanMonitoring = (tanggalMulai, tanggalSelesai) => {
  if (!tanggalMulai) return "-";

  const mulai = new Date(tanggalMulai);
  const selesai = new Date(tanggalSelesai || tanggalMulai);

  const tanggalAcuan =
    mulai.getMonth() !== selesai.getMonth() ? selesai : mulai;

  return tanggalAcuan.toLocaleDateString("id-ID", {
    month: "long",
  });
};

const bulanOptions = computed(() => {
  const map = new Map();

  monitoringList.value.forEach((item) => {
    const bulan = getNamaBulanMonitoring(
      item.tanggal_mulai,
      item.tanggal_selesai,
    );

    map.set(bulan, bulan);
  });

  return Array.from(map.values());
});

const bulanFilterOptions = computed(() => {
  const bulanSaatIni = getBulanSaatIni();
  const options = new Set([bulanSaatIni, ...bulanOptions.value]);

  return Array.from(options);
});

const tahunAjaranList = ref([]);
const kelasOptions = computed(() => {
  const map = new Map();

  monitoringList.value.forEach((item) => {
    if (!item.kelas) return;

    map.set(item.kelas.id, item.kelas);
  });

  return Array.from(map.values());
});

const filterTahunAjaranId = ref("");
const filterKelasId = ref("");

const filteredMonitoringList = computed(() => {
  return monitoringList.value.filter((item) => {
    const bulan = getNamaBulanMonitoring(
      item.tanggal_mulai,
      item.tanggal_selesai,
    );

    const matchBulan =
      !filterBulan.value ||
      filterBulan.value === "__CURRENT_MONTH__" ||
      bulan === filterBulan.value;

    const matchSemester =
      !filterSemester.value || item.semester === filterSemester.value;

    const matchStatus =
      !filterStatus.value || item.status === filterStatus.value;

    return matchBulan && matchSemester && matchStatus;
  });
});

const loadData = async () => {
  try {
    loading.value = true;

    const tahunRes = await getAllTahunAjaran();

    tahunAjaranList.value = tahunRes.data;
    tahunAjaranAktif.value = tahunRes.data.find((item) => item.is_active);

    if (!filterTahunAjaranId.value && tahunAjaranAktif.value) {
      filterTahunAjaranId.value = tahunAjaranAktif.value.id;
    }

    if (isGuru.value) {
      const guruKelasRes = await getMyGuruKelas();
      kelasGuru.value = guruKelasRes.data;

      if (kelasGuru.value.length > 0) {
        selectedKelas.value = kelasGuru.value[0];
      }
    }

    console.log("tahun aktif", tahunAjaranAktif.value);
    console.log("selected kelas", selectedKelas.value);
    await loadMonitoring();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const loadMonitoring = async () => {
  if (!tahunAjaranAktif.value) return;

  const params = {
    tahun_ajaran_id: filterTahunAjaranId.value || tahunAjaranAktif.value.id,
  };

  if (isGuru.value) {
    if (!selectedKelas.value) return;
    params.kelas_id = selectedKelas.value.kelas.id;
  }

  if (isAdmin.value && filterKelasId.value) {
    params.kelas_id = filterKelasId.value;
  }

  const res = await getMonitoringMingguan(params);
  monitoringList.value = res.data || [];

  if (!filterBulan.value) {
    filterBulan.value = getBulanSaatIni();
  }
};

const defaultForm = () => ({
  semester: "",
  minggu: "",
  topik: "",
  sub_topik: "",
  tanggal_mulai: "",
  tanggal_selesai: "",
  tp: [
    {
      elemen: "",
      tujuan: "",
      kktp: [{ deskripsi: "" }],
    },
  ],
  kegiatan: [
    {
      nama: "",
      media: "",
    },
  ],
  asesmen_awal: {
    teknik: "Observasi",
    rancangan_kegiatan: "",
    hasil: "",
  },
});

const form = reactive(defaultForm());

const resetForm = () => {
  Object.assign(form, defaultForm());
};

const currentEditItem = ref(null);

const detailLocked = computed(() => {
  return isEditMode.value && (currentEditItem.value?.total_selesai || 0) > 0;
});

const fillFormEdit = async (id, item = null) => {
  const res = await getMonitoringMingguanById(id);
  const data = res.data;

  editId.value = data.id;
  currentEditItem.value = item;

  form.semester = data.semester;
  form.minggu = data.minggu;
  form.topik = data.topik;
  form.sub_topik = data.sub_topik;
  form.tanggal_mulai = data.tanggal_mulai;
  form.tanggal_selesai = data.tanggal_selesai;

  form.tp = (data.tp || []).map((tp) => ({
    elemen: tp.elemen,
    tujuan: tp.tujuan,
    kktp: (tp.kktp || []).map((kktp) => ({
      deskripsi: kktp.deskripsi,
    })),
  }));

  form.kegiatan = (data.kegiatan || []).map((item) => ({
    nama: item.nama,
    media: item.media,
  }));

  form.asesmen_awal = {
    teknik: data.asesmen_awal?.teknik || "Observasi",
    rancangan_kegiatan: data.asesmen_awal?.rancangan_kegiatan || "",
    hasil: data.asesmen_awal?.hasil || "",
  };

  setTimeout(() => {
    const y =
      formAnchor.value.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, 100);
};

const handleEditQuery = async () => {
  const editIdFromQuery = Number(route.query.edit_id);

  if (editIdFromQuery) {
    const item = monitoringList.value.find((m) => m.id === editIdFromQuery);
    await fillFormEdit(editIdFromQuery, item || null);
    return;
  }

  editId.value = null;
  currentEditItem.value = null;
  resetForm();
};

const addTP = () => {
  form.tp.push({
    elemen: "nabp",
    tujuan: "",
    kktp: [{ deskripsi: "" }],
  });
};

const removeTP = (index) => {
  form.tp.splice(index, 1);
};

const addKKTP = (tpIndex) => {
  form.tp[tpIndex].kktp.push({
    deskripsi: "",
  });
};

const removeKKTP = (tpIndex, kktpIndex) => {
  form.tp[tpIndex].kktp.splice(kktpIndex, 1);
};

const addKegiatan = () => {
  form.kegiatan.push({
    nama: "",
    media: "",
  });
};

const removeKegiatan = (index) => {
  form.kegiatan.splice(index, 1);
};

const cancelEdit = () => {
  editId.value = null;
  currentEditItem.value = null;
  resetForm();

  router.replace({
    name: "AdminMonitoring",
  });
};

const handleSubmit = async () => {
  errors.value = {};

  if (!tahunAjaranAktif.value) {
    showWarning("Tahun ajaran aktif wajib dipilih");
    return;
  }

  if (!selectedKelas.value) {
    showWarning("Belum terdaftar di kelas manapun");
    return;
  }

  loading.value = true;

  try {
    const basePayload = {
      kelas_id: selectedKelas.value.kelas.id,
      tahun_ajaran_id: tahunAjaranAktif.value.id,
      semester: form.semester,
      minggu: form.minggu,
      topik: form.topik,
      sub_topik: form.sub_topik,
      tanggal_mulai: form.tanggal_mulai,
      tanggal_selesai: form.tanggal_selesai,
    };

    const createPayload = {
      ...basePayload,
      tp: form.tp.map((tp) => ({
        ...tp,
        kktp: tp.kktp,
      })),
      kegiatan: form.kegiatan,
      asesmen_awal: form.asesmen_awal,
    };

    const res = isEditMode.value
      ? await updateMonitoringMingguan(editId.value, basePayload)
      : await createMonitoringMingguan(createPayload);

    showSuccess(
      res.message ||
        (isEditMode.value
          ? "Monitoring berhasil diperbarui"
          : "Monitoring berhasil dibuat"),
    );

    const monitoringId = isEditMode.value ? editId.value : res.data?.id;

    editId.value = null;
    currentEditItem.value = null;
    resetForm();

    router.push({
      name: "AdminMonitoringMingguanDetail",
      params: { id: monitoringId },
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  } catch (error) {
    console.error(error);

    if (error.code === 422) {
      errors.value = error.errors || {};
    }

    showError(
      error.message ||
        (isEditMode.value
          ? "Gagal memperbarui monitoring mingguan"
          : "Gagal membuat monitoring mingguan"),
    );
  } finally {
    loading.value = false;
  }
};

const handlePublish = async (item) => {
  if ((item.total_selesai || 0) < (item.total_siswa || 0)) {
    showWarning(
      "Monitoring belum bisa dipublish karena masih ada siswa yang belum diisi",
    );
    return;
  }

  try {
    loading.value = true;

    const res = await publishMonitoringMingguan(item.id);

    showSuccess(res.message || "Monitoring berhasil dipublish");

    await loadMonitoring();
  } catch (error) {
    showError(error.message || "Gagal publish monitoring");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadData();
  await handleEditQuery();
});

onActivated(async () => {
  await loadData();
  await handleEditQuery();
});

watch(
  () => route.query.edit_id,
  async () => {
    await handleEditQuery();
  },
);
</script>

<style scoped></style>
