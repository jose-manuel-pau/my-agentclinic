import { MainLayout } from "../src/components/main-layout";

export default function HomePage() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-clinic-600">
          Agent healthcare operations
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950 sm:text-6xl">AgentClinic</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Coordinate agent ailments, therapies, and appointment workflows from one reliable clinical
          dashboard.
        </p>
        <div className="mt-10">
          <button
            type="button"
            id="get-started"
            className="rounded-md bg-clinic-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-clinic-500 focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:ring-offset-2"
          >
            Get Started
          </button>
        </div>
      </section>
    </MainLayout>
  );
}
