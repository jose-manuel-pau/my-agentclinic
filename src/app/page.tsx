import { MainLayout } from "../components/main-layout";

export default function HomePage() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-clinic-600">
          Agent healthcare operations
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl lg:text-6xl">
          AgentClinic
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Coordinate agent ailments, therapies, and appointment workflows from one reliable clinical
          dashboard.
        </p>
        <div className="mt-10">
          <button
            type="button"
            id="get-started"
            className="w-full rounded-md bg-clinic-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-clinic-500 focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:ring-offset-2 sm:w-auto"
          >
            Get Started
          </button>
        </div>
      </section>
    </MainLayout>
  );
}
