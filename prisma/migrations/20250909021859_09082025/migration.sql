-- CreateTable
CREATE TABLE "public"."Waifu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "anilistId" INTEGER NOT NULL,

    CONSTRAINT "Waifu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" SERIAL NOT NULL,
    "anilistId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WaifuMedia" (
    "waifuId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "WaifuMedia_pkey" PRIMARY KEY ("waifuId","mediaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waifu_anilistId_key" ON "public"."Waifu"("anilistId");

-- CreateIndex
CREATE INDEX "Waifu_name_idx" ON "public"."Waifu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Media_anilistId_key" ON "public"."Media"("anilistId");

-- AddForeignKey
ALTER TABLE "public"."WaifuMedia" ADD CONSTRAINT "WaifuMedia_waifuId_fkey" FOREIGN KEY ("waifuId") REFERENCES "public"."Waifu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WaifuMedia" ADD CONSTRAINT "WaifuMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "public"."Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
