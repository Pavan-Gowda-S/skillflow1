/**
 * Simulated Freshworks capability service.
 *
 * PROTOTYPE ONLY — these functions return mock data with simulated latency.
 * They exist so the UI consumes a service boundary that could later be
 * replaced by real Freshworks MCP / API calls without touching components.
 */
import { customers, tickets } from "@/data/mock";
import type { Customer, Ticket } from "@/data/types";

export const SIMULATED = true;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface CallEnvelope<T> {
  tool: string;
  system: string;
  input: Record<string, unknown>;
  output: T;
  durationMs: number;
  simulated: boolean;
}

export const FreshworksService = {
  async lookupCustomer(customerId: string): Promise<CallEnvelope<Partial<Customer>>> {
    await delay(420);
    const customer = customers.find((c) => c.id === customerId) ?? customers[0]!;
    return {
      tool: "customer.lookup",
      system: "Freshworks",
      input: { customer_id: customerId },
      output: {
        name: customer.name,
        status: customer.status,
        accountType: customer.accountType,
        region: customer.region,
      },
      durationMs: 420,
      simulated: SIMULATED,
    };
  },

  async searchTickets(
    customerId: string,
    query: string,
  ): Promise<CallEnvelope<{ tickets: Ticket[]; relatedCount: number }>> {
    await delay(610);
    return {
      tool: "ticket.search",
      system: "Freshworks",
      input: { customer_id: customerId, query },
      output: { tickets, relatedCount: 17 },
      durationMs: 610,
      simulated: SIMULATED,
    };
  },

  async updateTicket(
    ticketId: string,
    payload: Record<string, unknown>,
  ): Promise<CallEnvelope<{ ticket_id: string; updated_at: string; assignee: string }>> {
    await delay(880);
    return {
      tool: "ticket.update",
      system: "Freshworks",
      input: { ticket_id: ticketId, ...payload },
      output: {
        ticket_id: ticketId,
        updated_at: new Date().toISOString(),
        assignee: "Platform Support",
      },
      durationMs: 880,
      simulated: SIMULATED,
    };
  },
};
