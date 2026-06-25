import { MainLayout } from "../components/main-layout";

export default function HomePage() {
  return (
    <MainLayout>
      <section className="container py-12 sm:py-16 lg:py-20">
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
        <div className="mt-10" role="group">
          <a href="/login" id="get-started" role="button">
            Get Started
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
