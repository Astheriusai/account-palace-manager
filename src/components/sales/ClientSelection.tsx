
import { useState } from "react";
import { Client } from "@/services/clientService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ClientSelectionProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;
}

const ClientSelection = ({ clients, onClientSelect }: ClientSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.phone && client.phone.includes(searchTerm))
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar cliente por nombre, email o teléfono..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="max-h-[300px] overflow-y-auto space-y-2">
        {filteredClients.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No se encontraron clientes</p>
        ) : (
          filteredClients.map(client => (
            <Button 
              key={client.id} 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => onClientSelect(client)}
            >
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-muted-foreground">
                  {client.email && <div>{client.email}</div>}
                  {client.phone && <div>{client.phone}</div>}
                </div>
              </div>
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientSelection;
