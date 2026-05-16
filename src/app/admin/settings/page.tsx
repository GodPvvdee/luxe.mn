import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Store-wide configuration and integrations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Store name</Label>
            <Input defaultValue="Luxe" />
          </div>
          <div className="space-y-1.5">
            <Label>Support email</Label>
            <Input defaultValue="hello@luxe.dev" />
          </div>
          <div className="space-y-1.5">
            <Label>Default currency</Label>
            <Input defaultValue="USD" />
          </div>
          <div className="space-y-1.5">
            <Label>Default locale</Label>
            <Input defaultValue="en-US" />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            ["Stripe", "Connected", "Card payments and webhooks"],
            ["Resend", "Connected", "Transactional email"],
            ["Algolia", "Not connected", "Product search"],
            ["Sentry", "Connected", "Error monitoring"],
          ].map(([name, status, desc]) => (
            <div key={name} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
              <Button variant={status === "Connected" ? "outline" : "default"} size="sm">
                {status === "Connected" ? "Manage" : "Connect"}
              </Button>
            </div>
          ))}
          <Separator />
          <p className="text-xs text-muted-foreground">
            Secrets are stored encrypted at rest and never sent to the client.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
