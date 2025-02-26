import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'

export function AppSidebar() {
  return (
    <Sidebar side="left" variant="inset" className="border-r-3">
      <SidebarHeader>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">NDEx V3</h1>
          <p className="text-sm text-muted-foreground">Network Data Exchange</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
