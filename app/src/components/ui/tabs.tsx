import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex items-center justify-center rounded-full bg-white/5 p-1 text-muted-foreground backdrop-blur-xl border border-white/10",
      className
    )}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
      className
    )}
    {...props}
  />
);

const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content
    className={cn("mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl", className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
