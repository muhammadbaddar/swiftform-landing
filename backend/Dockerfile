# استخدام نسخة خفيفة من Node.js
FROM node:20-alpine

# تعيين مجلد العمل داخل الحاوية
WORKDIR /app

# نسخ ملفات الباكيج لتثبيت التبعيات أولًا
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ بقية ملفات المشروع
COPY . .

# فتح المنفذ 3000
EXPOSE 3000

# أمر التشغيل
CMD ["node", "index.js"]
