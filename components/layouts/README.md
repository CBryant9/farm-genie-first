# Authenticated Layout Component

This directory contains the `AuthenticatedLayout` component that provides a consistent sidebar navigation for all authenticated pages in the Farm Genie application.

## Usage

### For New Authenticated Pages

When creating new pages that should have the sidebar (all pages after authentication), use the layout in one of two ways:

#### Option 1: Using the Dashboard Layout (Recommended)
Place your new page under the `/dashboard/` directory. The layout will automatically be applied:

```
app/dashboard/
├── page.tsx (main dashboard)
├── analytics/
│   └── page.tsx
├── team/
│   └── page.tsx
├── settings/
│   └── page.tsx
└── layout.tsx (applies sidebar to all dashboard pages)
```

#### Option 2: Using the AuthenticatedLayout Component
For pages outside the dashboard directory, import and use the component directly:

```tsx
import AuthenticatedLayout from "@/components/layouts/authenticated-layout";

export default function MyAuthenticatedPage() {
  return (
    <AuthenticatedLayout title="Custom Page Title">
      <div className="p-8">
        <h1>My Authenticated Page</h1>
        {/* Your page content here */}
      </div>
    </AuthenticatedLayout>
  );
}
```

## Sidebar Navigation

The sidebar includes the following navigation items:

- **Dashboard** (`/dashboard`) - Main dashboard
- **Settings** (`/dashboard/settings`) - Account and farm preferences
- **Reminders** (`/dashboard/reminders`) - Alerts and notifications
- **Farm Logs** (`/dashboard/farm-logs`) - Daily activity tracking
- **Upload Document** (`/dashboard/upload`) - File upload interface
- **Your Records** (`/dashboard/records`) - Data and history access
- **Updates & Community** (`/dashboard/community`) - Community features
- **Analytics** (`/dashboard/analytics`) - Performance metrics
- **Calendar** (`/dashboard/calendar`) - Scheduling and planning
- **Logout** (`/`) - Return to homepage

## Features

- **Responsive Design**: Works on desktop and mobile
- **Collapsible Sidebar**: Hover to expand/collapse on desktop
- **Mobile Menu**: Hamburger menu for mobile devices
- **Consistent Styling**: Matches the Farm Genie design system
- **Smooth Animations**: Uses Framer Motion for smooth transitions

## Styling Guidelines

When creating content for authenticated pages:

1. **Use consistent padding**: `p-8` for main content areas
2. **Use the white/transparent background**: `bg-white/90` for content cards
3. **Follow the color scheme**: Green (`text-green-700`, `bg-green-50`, etc.)
4. **Use rounded corners**: `rounded-2xl` for main containers, `rounded-xl` for cards
5. **Add shadows**: `shadow-lg` for main content areas

## Example Page Structure

```tsx
export default function ExamplePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Page Title</h1>
          
          {/* Your page content here */}
          <div className="space-y-6">
            {/* Content sections */}
          </div>
        </div>
      </div>
    </div>
  );
}
``` 