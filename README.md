# atom — кітап лендингі (мұрағат)

> **Бұл репозиторий енді дамытылмайды.** Лендинг оқу платформасына біріктірілген:
> **[bibaermek-stack/atom-dashboard](https://github.com/bibaermek-stack/atom-dashboard)** →
> `src/landing/`. Жаңа өзгерістерді сонда жасаңыз.
>
> Жұмыс істеп тұрған сайт: https://atom-dashboard-sigma.vercel.app/about

«Атомдық және ядролық физика: теория, қолданбалы оқыту және STEM кейстер» оқу құралының
(А.Ш. Уәлихан, М.К. Скаков, С.М. Бекбаев, М.М. Нуризинова; Өскемен, 2026) бір беттік ақпараттық сайты:
кітап туралы, мазмұны, тараулар, байланыс. Фонында айналатын 3D атом моделі (`public/models/atom.glb`).

Репозиторий тарих үшін сақталған. Мұндағы код `atom-dashboard`-қа көшірілген сәттегі күйінде қалды;
платформадағы нұсқасы одан бері өзгерген болуы мүмкін.

## Жергілікті іске қосу

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # tsc --noEmit
```

Стек: React 19, TypeScript, Vite 6, Tailwind CSS 4, three.js (React Three Fiber). Сервер бөлігі де,
API кілттері де жоқ — таза статикалық сайт.
