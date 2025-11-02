-- Create projects table for portfolio showcase
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for projects and testimonials
CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

-- Public insert for contact form
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Insert sample projects
INSERT INTO public.projects (title, description, technologies, project_url, featured, display_order) VALUES
  ('E-Commerce Platform', 'Built a full-stack e-commerce solution with real-time inventory management and payment integration', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://example.com', true, 1),
  ('Task Management App', 'Collaborative project management tool with real-time updates and team collaboration features', ARRAY['TypeScript', 'React', 'Supabase'], 'https://example.com', true, 2),
  ('Analytics Dashboard', 'Custom analytics platform with interactive charts and data visualization', ARRAY['React', 'D3.js', 'TailwindCSS'], 'https://example.com', true, 3);

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, company, role, content, rating, display_order) VALUES
  ('Sarah Johnson', 'Tech Startup Inc', 'CEO', 'Outstanding work! Delivered beyond expectations and on time. Highly recommend for any web development project.', 5, 1),
  ('Michael Chen', 'Digital Agency', 'Product Manager', 'Great communication and technical skills. The project was completed efficiently with high quality code.', 5, 2),
  ('Emily Davis', 'Retail Corp', 'CTO', 'Professional and skilled developer. Built exactly what we needed with excellent attention to detail.', 5, 3);