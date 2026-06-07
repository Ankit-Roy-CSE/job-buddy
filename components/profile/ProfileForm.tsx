import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Badge } from "@/components/ui/Badge"
import { Plus, X } from "lucide-react"

export function ProfileForm() {
  return (
    <Card className="flex flex-col gap-8">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-text-primary">Profile Information</h2>
        <p className="text-sm text-text-secondary">
          This context is used to accurately represent you in agent interactions.
        </p>
      </div>

      <div className="border-t border-border pt-8 space-y-6">
        <h3 className="text-sm font-semibold text-text-primary">Personal Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Full Name</Label>
            <Input defaultValue="Alex Johnson" />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input type="email" defaultValue="alex.johnson@example.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <Label>Location</Label>
            <Input placeholder="City, State, Country" />
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input defaultValue="https://linkedin.com/in/alexjohnson" />
          </div>
          <div>
            <Label>Portfolio / GitHub URL</Label>
            <Input defaultValue="https://github.com/alexj" />
          </div>
          <div>
            <Label>Work Authorization</Label>
            <Select defaultValue="us_citizen">
              <option value="us_citizen">US Citizen / Green Card</option>
              <option value="h1b">H-1B Visa</option>
              <option value="opt">OPT / CPT</option>
              <option value="other">Other / Require Sponsorship</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 space-y-6">
        <h3 className="text-sm font-semibold text-text-primary">Professional Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Current/Recent Job Title</Label>
            <Input defaultValue="Frontend Engineer" />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Select defaultValue="senior">
              <option value="entry">Entry-Level</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead / Principal</option>
              <option value="exec">Executive</option>
            </Select>
          </div>
          <div>
            <Label>Years of Experience</Label>
            <Input type="number" defaultValue={5} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="default" className="gap-1 px-3 py-1 bg-surface border-border">
                React <X className="w-3 h-3 text-text-muted cursor-pointer hover:text-text-primary" />
              </Badge>
              <Badge variant="default" className="gap-1 px-3 py-1 bg-surface border-border">
                TypeScript <X className="w-3 h-3 text-text-muted cursor-pointer hover:text-text-primary" />
              </Badge>
              <Badge variant="default" className="gap-1 px-3 py-1 bg-surface border-border">
                Next.js <X className="w-3 h-3 text-text-muted cursor-pointer hover:text-text-primary" />
              </Badge>
              <Badge variant="default" className="gap-1 px-3 py-1 bg-surface border-border">
                Tailwind CSS <X className="w-3 h-3 text-text-muted cursor-pointer hover:text-text-primary" />
              </Badge>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type a skill and press Enter" className="max-w-md" />
              <Button variant="secondary">Add</Button>
            </div>
          </div>

          <div>
            <Label>Industries Worked In (Optional)</Label>
            <div className="flex gap-2">
              <Input placeholder="E.g., Fintech, Healthcare, E-commerce" className="max-w-md" />
              <Button variant="secondary">Add</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Work Experience</h3>
          <Button variant="ghost" className="h-8 px-2 gap-1 text-accent hover:text-accent-dark hover:bg-transparent">
            <Plus className="w-4 h-4" /> Add role
          </Button>
        </div>
        
        <div className="p-5 border border-border rounded-xl space-y-4 bg-surface-secondary/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input defaultValue="Tech Innovators Inc." />
            </div>
            <div>
              <Label>Job Title</Label>
              <Input defaultValue="Senior Frontend Engineer" />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input type="month" defaultValue="2021-03" />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="month" />
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="current-job" className="rounded border-border text-accent focus:ring-accent" defaultChecked />
                <label htmlFor="current-job" className="text-sm text-text-secondary">Currently working here</label>
              </div>
            </div>
            <div className="md:col-span-2">
              <Label>Key Responsibilities & Achievements</Label>
              <Textarea 
                defaultValue="• Led the frontend team in migrating a legacy React application to Next.js, improving page load speed by 40%.\n• Implemented a design system using Tailwind CSS and Radix UI.\n• Mentored 3 junior developers."
                className="min-h-[120px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 space-y-6">
        <h3 className="text-sm font-semibold text-text-primary">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Highest Degree</Label>
            <Select defaultValue="bachelors">
              <option value="highschool">High School</option>
              <option value="associates">Associate's Degree</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">Ph.D.</option>
            </Select>
          </div>
          <div>
            <Label>Field of Study</Label>
            <Input defaultValue="Computer Science" />
          </div>
          <div>
            <Label>Institution Name</Label>
            <Input defaultValue="University of Technology" />
          </div>
          <div>
            <Label>Graduation Year</Label>
            <Input type="number" defaultValue={2020} />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 space-y-6">
        <h3 className="text-sm font-semibold text-text-primary">Job Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Job Titles Seeking</Label>
            <Input defaultValue="Frontend Engineer, React Developer, UI Engineer" />
          </div>
          <div>
            <Label>Remote Preference</Label>
            <Select defaultValue="remote">
              <option value="remote">Fully Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
              <option value="any">Any</option>
            </Select>
          </div>
          <div>
            <Label>Salary Expectation (Optional)</Label>
            <Input placeholder="$120k - $150k" />
          </div>
          <div>
            <Label>Preferred Locations (Optional)</Label>
            <Input placeholder="San Francisco, New York, Austin" />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button variant="primary" className="w-full py-3 text-base">Save Profile</Button>
      </div>

    </Card>
  )
}
