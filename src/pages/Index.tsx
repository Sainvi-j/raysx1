// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">IoT Energy Dashboard</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Professional renewable energy microgrid monitoring solution
        </p>
        <a 
          href="/dashboard" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-solar to-wind text-solar-foreground font-medium rounded-lg hover:from-solar/80 hover:to-wind/80 transition-all"
        >
          Access Demo Dashboard
        </a>
      </div>
    </div>
  );
};

export default Index;
