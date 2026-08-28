# SkillFlow Agents

MASTER ONE-SHOT BUILD PROMPT

The Great Agent Hackathon 2026 — Track 2 Prototype

You are an expert product designer, senior frontend engineer, AI-agent architect, enterprise SaaS designer, and hackathon product strategist.

Your task is to build a complete, polished, highly interactive frontend prototype for a hackathon submission.

This is NOT a generic dashboard and NOT a generic AI chatbot.

The prototype must visually communicate a technically credible product concept for:

THE GREAT AGENT HACKATHON 2026

Track 2 — Platform Agent Skills & Knowledge

The track focuses on:

Reusable agent skills

MCP integrations

Knowledge

Freshworks developer platform

The prototype will be used to record a 3–5 minute selection/demo video that will be submitted to the hackathon application.

The judge should understand the product concept, the relationship with Freshworks, the role of MCP, the role of reusable skills, and our differentiator within the first 60–90 seconds.

1. FIRST UNDERSTAND WHAT WE ARE BUILDING

Before writing any code, understand this product concept.

We are NOT building another Freshworks.

We are NOT building another Freshdesk.

We are NOT replacing Freshworks.

We are NOT claiming that Freshworks lacks AI agents, AI Actions, MCP, APIs, developer tools, or automation.

Freshworks already provides enterprise products and developer capabilities for customer service, IT service management, CRM, knowledge, workflows, AI agents, AI Actions, developer extensions, and MCP-related capabilities.

Our product is an additional proposed agent capability orchestration layer that works with existing enterprise capabilities.

The central idea is:

Give AI agents reusable capabilities instead of forcing every agent to have its tools and workflows hard-coded inside it.

Our platform allows an AI agent to:

Understand a task

Discover the capabilities it needs

Select reusable skills

Compose those skills into a workflow

Access enterprise tools through MCP/integrations

Retrieve relevant knowledge

Check permissions

Request human approval for sensitive actions

Execute the approved action

Show what happened

Maintain an execution trace and audit history

The prototype should demonstrate this complete flow.

2. THE CORE PRODUCT IDEA

Working product name:

SkillMesh

Product descriptor:

Agent Capability Platform

Primary positioning:

Give AI agents capabilities, not just conversations.

Secondary positioning:

Discover. Compose. Connect. Govern.

Short product explanation:

SkillMesh is a proposed agent capability layer where AI agents can discover reusable skills, compose them into task-specific workflows, connect to enterprise systems through MCP and APIs, retrieve knowledge, and execute actions under permission and human-approval controls.

Again:

This is a prototype/concept demonstration.

Do not represent simulated functionality as a live production integration.

3. THE FUNDAMENTAL ARCHITECTURE

The entire application should be based on this architecture:

                         USER
                           │
                           ▼
                       AI AGENT
                           │
                           ▼
                  TASK UNDERSTANDING
                           │
                           ▼
                  SKILL DISCOVERY
                           │
                           ▼
                 SKILL ORCHESTRATOR
                           │
                           ▼
                    MCP / API LAYER
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
     FRESHWORKS        KNOWLEDGE        EXTERNAL
     CAPABILITIES       SYSTEMS         SERVICES
          │
     ┌────┼─────┐
     ▼    ▼     ▼
 Customers Tickets Knowledge
                           │
                           ▼
                       GOVERNANCE
                           │
                           ▼
                  HUMAN APPROVAL
                           │
                           ▼
                        ACTION
                           │
                           ▼
                    AUDIT / TRACE


This architecture is the conceptual heart of the entire website.

Every major screen should reinforce this architecture.

4. THE DIFFERENCE BETWEEN FRESHWORKS AND OUR PRODUCT

This distinction MUST be obvious throughout the application.

Think of Freshworks as the existing enterprise ecosystem.

Freshworks can provide things such as:

Customers

Tickets

Knowledge

Support workflows

Enterprise service data

APIs

Developer platform

AI capabilities

AI Actions

Agent-related capabilities

MCP/developer tooling

Our platform sits above/around those capabilities.

Our proposed layer focuses on:

Skill discovery

Reusable skill registry

Capability composition

Agent-oriented orchestration

Cross-capability workflows

MCP-aware execution

Permission-aware actions

Human approval

Execution observability

Audit trail

IMPORTANT:

Do NOT state:

"Freshworks cannot do X."

Do NOT state:

"Freshworks has no MCP."

Do NOT state:

"Freshworks has no AI agents."

Do NOT state:

"We invented MCP."

Instead communicate:

Freshworks provides powerful enterprise capabilities. SkillMesh proposes an additional capability layer that makes those capabilities easier for agents to discover, compose, govern and observe across a task.

This distinction is critical to the credibility of the hackathon submission.

5. PRIMARY DEMO SCENARIO

The entire prototype should revolve around ONE compelling scenario.

Do not create 10 unrelated demo scenarios.

Use this:

Customer: ABC Corporation

Problem:

ABC Corporation's production synchronization has stopped.

An AI agent receives this task:

"Investigate why ABC Corporation's production synchronization stopped and recommend the next action."

The agent should need several capabilities to complete the task.

The demonstration flow:

User request
      ↓
Understand task
      ↓
Discover skills
      ↓
Customer Lookup
      ↓
Ticket Search
      ↓
Knowledge Search
      ↓
Similar Incident Detection
      ↓
Resolution Recommendation
      ↓
Permission Check
      ↓
Human Approval
      ↓
Update Ticket
      ↓
Execution Trace
      ↓
Completed


This scenario must be implemented as an interactive simulated workflow.

6. VERY IMPORTANT — PROTOTYPE VS REAL INTEGRATION

This is a frontend prototype.

Unless actual Freshworks credentials/API/MCP connectivity are configured, DO NOT pretend that the system is live.

Use realistic mock data.

Where Freshworks is shown, use labels such as:

Prototype Environment

or

Simulated Freshworks Connection

The purpose is to demonstrate:

SkillMesh
   ↓
MCP / Integration
   ↓
Freshworks capability
   ↓
Result


The prototype should make the intended real-world architecture believable without falsely claiming a live production integration.

Design the architecture so that real integrations could later replace the mock service layer.

Use clean mock service abstractions in the code so that the simulated Freshworks calls are separated from the UI.

7. TECHNOLOGY

Build the frontend using:

React

TypeScript

Tailwind CSS

Modern reusable components

Lucide icons or another professional icon library

Clean component architecture

Local/mock data

Frontend state management

Do NOT build unnecessary backend infrastructure for this prototype.

The objective is:

Maximum visual credibility + interaction + technical storytelling.

8. VISUAL DESIGN

The application should look like a serious enterprise AI infrastructure/developer platform.

It should feel comparable in polish to:

Modern cloud platforms

AI developer platforms

Agent observability platforms

Enterprise SaaS

Developer tooling dashboards

AI infrastructure products

Do NOT copy Freshworks' UI.

We need a distinct visual identity.

Use:

Dark-first theme

Deep navy / charcoal background

Subtle blue/cyan/violet accents

Thin borders

High-quality typography

Subtle gradients

Glass/soft-surface cards where appropriate

Strong spacing

Professional charts

Technical diagrams

Status indicators

Command-center feeling

Smooth micro-interactions

Avoid:

Cartoon AI illustrations

Excessive neon

Generic SaaS template appearance

Huge unnecessary gradients

Excessive rounded cards

Fake "hacker" aesthetics

Generic ChatGPT clone design

Stock images

The application should look like a serious product being demonstrated to enterprise judges.

9. GLOBAL APPLICATION LAYOUT

Create a persistent left sidebar.

Top of sidebar:

SkillMesh

Agent Capability Platform

Include:

OVERVIEW

Dashboard

AGENT

Agent Playground

Agents

CAPABILITIES

Skills

MCP Tools

Knowledge

OPERATIONS

Executions

Governance

Analytics

At the bottom:

Connection status

DEMO ENVIRONMENT

User profile

Top header:

Global search

Workspace selector

Notifications

Environment indicator

User profile

10. DASHBOARD

The Dashboard is the first screen.

Header:

Agent Capability Overview

Subtitle:

Discover, compose and govern reusable capabilities for AI agents.

Show metric cards:

Active Agents

6

Available Skills

127

MCP Tools

18

Knowledge Sources

42

Executions Today

284

Approval Requests

7

These are mock/demo values.

11. DASHBOARD — ARCHITECTURE CARD

Create a large visual card titled:

How SkillMesh Works

Show:

AI AGENT
   ↓
SKILL DISCOVERY
   ↓
SKILL COMPOSITION
   ↓
MCP / INTEGRATIONS
   ↓
ENTERPRISE SYSTEMS


Under enterprise systems show:

Freshworks

Knowledge Hub

External APIs

Use animated connection lines.

Clicking a node should open a small explanatory panel.

12. DASHBOARD — CONNECTIONS

Create a section:

Connected Capability Sources

Cards:

Freshworks

Customer / Ticket / Knowledge capabilities

Status:
Prototype Connected

Badge:
SIMULATED

Knowledge Hub

Enterprise documentation

Status:
Connected

External Services

External enterprise APIs

Status:
Connected

The Freshworks card must not imply a live connection.

13. DASHBOARD — RECENT EXECUTIONS

Create:

Recent Agent Executions

Example:

Investigation Agent

Investigate ABC Corporation sync issue

Status:
Completed

Skills:
6

Duration:
11.4s

Support Resolution Agent

Find duplicate customer incidents

Status:
Completed

Skills:
4

Duration:
7.2s

Knowledge Agent

Find authentication policy

Status:
Completed

Skills:
3

Duration:
4.1s

Rows/cards should be clickable and open execution details.

14. DASHBOARD — CAPABILITY HEALTH

Show:

Skills available

MCP servers

Knowledge sources

Recent errors

Approval queue

Use polished status indicators.

15. AGENT PLAYGROUND

THIS IS THE MOST IMPORTANT SCREEN.

The Agent Playground should be the centerpiece of the prototype and the primary screen used during the video.

Header:

Agent Playground

Subtitle:

Give an agent a goal. Let it discover and compose the capabilities required to complete it.

Large task input.

Prepopulate with:

Investigate why ABC Corporation's production synchronization stopped and recommend the next action.

Primary button:

Run Agent

Secondary:

Clear

Below the input show:

Example Tasks

Investigate a customer issue

Find similar incidents

Search company knowledge

Prepare a support resolution

Analyze a ticket

16. AGENT RUN EXPERIENCE

When the user clicks Run Agent, do NOT immediately show the final answer.

Create a cinematic but professional execution sequence.

Use a visible progress/timeline system.

Stage 1:

Understanding Request

Show:

✓ Customer investigation
✓ Historical ticket analysis
✓ Knowledge retrieval
✓ Similar incident analysis
✓ Resolution recommendation

Then automatically progress.

17. STAGE 2 — SKILL DISCOVERY

Show:

Discovering Required Skills

Animate skill cards into the interface.

Skills:

Customer Lookup

Category:
Customer

Access:
READ

Source:
Freshworks

Ticket Search

Category:
Support

Access:
READ

Source:
Freshworks

Knowledge Search

Category:
Knowledge

Access:
READ

Source:
Knowledge Hub

Similar Incident Detection

Category:
Analysis

Access:
ANALYSIS

Source:
Incident Intelligence

Resolution Recommendation

Category:
Reasoning

Access:
REASONING

Update Ticket

Category:
Workflow

Access:
WRITE

Source:
Freshworks

Approval:
Required

18. STAGE 3 — SKILL COMPOSITION

After discovery, display:

Generated Capability Workflow

Build an interactive workflow:

Customer Lookup
       ↓
Ticket Search
       ↓
Knowledge Search
       ↓
Similar Incident Detection
       ↓
Resolution Recommendation
       ↓
Update Ticket


Every node should display:

Skill name

Source

Permission

Status

Duration

Example:

Customer Lookup
Freshworks
READ
Completed
420ms

Ticket Search
Freshworks
READ
Completed
610ms

Knowledge Search
Knowledge Hub
READ
Completed
740ms

19. STAGE 4 — MCP EXECUTION

Create a prominent panel:

MCP Execution

Visual:

AI AGENT
   ↓
SKILL ORCHESTRATOR
   ↓
MCP / INTEGRATION LAYER
   ↓
FRESHWORKS


Show live-looking call logs.

Example:

✓ customer.lookup
✓ ticket.search
✓ knowledge.search
✓ incident.compare
⚠ ticket.update

Each row contains:

Tool name

System

Input

Output

Status

Duration

Freshworks calls should be marked:

Prototype Simulation

20. FRESHWORKS CAPABILITY DETAIL

When the user clicks:

customer.lookup

show a drawer/modal.

Title:

Freshworks — Customer Lookup

Type:

Enterprise Capability

System:

Freshworks

Interface:

MCP / API

Access:

READ

Status:

Prototype Simulation

Example input:

{
  "customer_id": "C1029"
}


Example output:

{
  "customer": "ABC Corporation",
  "status": "active",
  "account_type": "enterprise"
}


Do the same for ticket search.

21. TICKET SEARCH RESULT

Show:

Ticket #48291

Customer:

ABC Corporation

Issue:

Production synchronization failure

Priority:

HIGH

Status:

OPEN

Created:

2 hours ago

Also show:

Historical tickets

17 related tickets found.

This demonstrates the Freshworks capability being consumed by our agent workflow.

22. KNOWLEDGE RETRIEVAL

Show a Knowledge panel.

Title:

Knowledge Retrieval

Query:

production synchronization failure

Results:

Production Synchronization Troubleshooting

Relevance:
96%

Authentication Token Policy

Relevance:
91%

Incident #3812

Relevance:
88%

Incident #4102

Relevance:
85%

Show:

3 similar incidents found

23. SIMILAR INCIDENT ANALYSIS

Create:

Incident Intelligence

Current issue:

Production synchronization stopped.

Historical matches:

Incident #3812

Similarity:
94%

Incident #4102

Similarity:
91%

Incident #4478

Similarity:
87%

Then show:

Pattern Detected

Likely cause:

Expired authentication token

Confidence:

High

Evidence:

3 historical incidents show the same failure pattern.

24. AGENT RECOMMENDATION

Show:

Agent Recommendation

Likely cause:

Expired authentication token.

Recommended action:

Refresh the authentication token and monitor synchronization.

Evidence:

3 similar incidents

Relevant troubleshooting documentation

Current ticket metadata

Then:

Proposed Action

Update Ticket #48291:

Add diagnosis and assign ticket to Platform Support.

Button:

Request Approval

25. HUMAN-IN-THE-LOOP GOVERNANCE

This is a critical part of the demonstration.

Before performing a WRITE action, pause the execution.

Show a prominent approval modal:

Action Requires Approval

Action:

Update Ticket #48291

Reason:

Agent identified a likely expired authentication token.

Proposed changes:

Add diagnosis

Assign to Platform Support

Add troubleshooting recommendation

Permission:

ticket.write

Risk:

Medium

Buttons:

Reject

Approve & Continue

Clicking Approve should continue the animation.

Clicking Reject should stop the workflow and show:

Execution stopped by human approval policy.

26. SUCCESS RESULT

After approval:

Show:

Investigation Complete

Customer:

ABC Corporation

Issue:

Production synchronization failure

Likely cause:

Expired authentication token

Recommendation:

Refresh authentication token and monitor synchronization.

Actions:

✓ Ticket updated
✓ Diagnosis added
✓ Assigned to Platform Support

Summary statistics:

Skills used:
6

MCP calls:
5

Human approvals:
1

Execution:
Completed

27. EXECUTION TRACE

After completion, automatically show:

Execution Trace

Create a beautiful vertical timeline.

Example:

14:32:04
Request received

14:32:04
Task classified

14:32:05
Skills discovered

14:32:05
Customer Lookup

14:32:06
Ticket Search

14:32:07
Knowledge Search

14:32:08
Similar Incident Detection

14:32:09
Resolution Recommendation

14:32:10
Permission check

14:32:10
Approval requested

14:32:13
Human approval received

14:32:14
Ticket updated

14:32:14
Execution completed

Each event should display:

Time

Skill/tool

System

Status

28. SKILLS PAGE

Create:

Skill Registry

Subtitle:

Reusable capabilities that agents can discover and compose.

Include:

Search bar.

Filters:

All

Knowledge

Customer

Ticket

Analysis

Workflow

External

Create polished cards.

Skill: Customer Lookup

Description:

Retrieve enterprise customer information.

Source:

Freshworks

Access:

READ

Used by:

12 agents

Skill: Ticket Search

Description:

Search support tickets using structured or semantic queries.

Source:

Freshworks

Access:

READ

Used by:

18 agents

Skill: Knowledge Search

Description:

Retrieve relevant enterprise knowledge.

Source:

Knowledge Hub

Access:

READ

Used by:

23 agents

Skill: Similar Incident Detection

Description:

Identify historical incidents with similar symptoms.

Source:

Incident Intelligence

Access:

ANALYSIS

Used by:

8 agents

Skill: Update Ticket

Description:

Modify support ticket information.

Source:

Freshworks

Access:

WRITE

Approval:

Required

Used by:

9 agents

29. SKILL DETAIL

Clicking a skill opens a detailed view.

Example:

Ticket Search

Description:

Search customer support tickets using structured filters and semantic queries.

Inputs:

customer_id
query
status
date_range


Outputs:

ticket_id
subject
status
priority
created_at


System:

Freshworks

Interface:

MCP / API

Permission:

READ

Usage:

1,284 executions

Agents using it:

18

Status:

Prototype

Button:

Test Skill

When clicked, show a simulated request/response.

30. MCP TOOLS PAGE

Create:

MCP Tool Registry

Subtitle:

Tools exposed to agents through standardized capability interfaces.

Tools:

customer.lookup

Source:
Freshworks

Permission:
READ

Status:
Available

ticket.search

Source:
Freshworks

Permission:
READ

Status:
Available

ticket.update

Source:
Freshworks

Permission:
WRITE

Approval:
Required

knowledge.search

Source:
Knowledge Hub

Permission:
READ

incident.compare

Source:
Incident Intelligence

Permission:
ANALYSIS

31. MCP TOOL DETAIL

Clicking a tool should open a detail view.

Example:

ticket.search

Description:

Search enterprise support tickets.

Source:

Freshworks

Interface:

MCP / API

Permission:

READ

Show:

Input Schema

{
  "customer_id": "string",
  "query": "string"
}


Output Schema

{
  "tickets": [
    {
      "id": "string",
      "subject": "string",
      "status": "string"
    }
  ]
}


Show:

Prototype Simulation

32. KNOWLEDGE PAGE

Create:

Knowledge Hub

Subtitle:

Enterprise knowledge available to agents.

Sources:

Support Documentation

4,821 documents

Internal SOPs

1,284 documents

Incident Reports

8,214 records

Product Documentation

4,102 documents

Authentication Policies

126 documents

All data is mock/demo data.

Show indexing/status indicators.

33. KNOWLEDGE SEARCH

Create semantic search interface.

Search:

production synchronization failure

Results should display:

title

source

relevance

excerpt

related incidents

Clicking a result opens a document preview.

34. EXECUTIONS PAGE

Create:

Agent Executions

Table:

AgentTaskSkillsDurationStatusInvestigation AgentABC sync issue611.4sCompletedSupport AgentDuplicate issue47.2sCompletedKnowledge AgentAuthentication policy34.1sCompleted

Include:

Search

Filters

Status

Agent

Date

Clicking an execution opens the complete trace.

35. GOVERNANCE PAGE

Create:

Agent Governance

Subtitle:

Control what agents can discover, execute and modify.

Create permission matrix.

CapabilityAccessCustomer LookupREADTicket SearchREADKnowledge SearchREADIncident AnalysisEXECUTETicket UpdateAPPROVAL REQUIREDCustomer MessageAPPROVAL REQUIREDTicket DeleteBLOCKED

Show a separate:

Approval Queue

Example:

Ticket #48291
Update ticket
Medium risk
Awaiting approval

Button:

Review

36. ANALYTICS PAGE

Create:

Capability Analytics

Show polished charts.

Metrics:

Agent success rate:
92%

Average execution time:
8.4 seconds

Approval rate:
78%

Skill reuse rate:
84%

MCP execution success:
96%

Show charts for:

Skill usage

Agent executions

MCP calls

Approval requests

Most used capabilities

All values are simulated.

37. AGENTS PAGE

Create:

Agents

Example agents:

Investigation Agent

Purpose:
Investigates complex customer incidents.

Skills:
6

Status:
Active

Support Resolution Agent

Purpose:
Assists support teams with diagnosis and resolution.

Skills:
8

Status:
Active

Knowledge Agent

Purpose:
Finds and synthesizes enterprise knowledge.

Skills:
5

Status:
Active

Clicking an agent shows:

Description

Available skills

Recent executions

Permissions

Tools

38. DIFFERENTIATOR / EXPLANATION SECTION

Create a page called:

Why SkillMesh?

The purpose is to explain the relationship between Freshworks and our product.

Create a two-column comparison.

LEFT:

Existing Enterprise Platform

Freshworks provides:

Customer management

Tickets

Knowledge

Workflows

APIs

AI capabilities

Developer platform

AI Actions

MCP/developer tooling

RIGHT:

Proposed Capability Layer

SkillMesh focuses on:

Skill discovery

Reusable capability registry

Skill composition

Agent orchestration

Cross-capability workflows

MCP-aware execution

Permission-aware actions

Human approval

Execution trace

Auditability

At the bottom:

Existing Enterprise Capabilities
                +
Reusable Agent Skills
                +
MCP Integrations
                +
Knowledge
                +
Governance
                ↓
        SKILLMESH
                ↓
        CAPABLE AGENTS


Use careful language.

Do NOT claim Freshworks lacks any existing capability.

39. INTERACTIVE ARCHITECTURE

Create an interactive architecture page.

Title:

Agent Capability Architecture

Diagram:

USER
 ↓
AI AGENT
 ↓
TASK UNDERSTANDING
 ↓
SKILL DISCOVERY
 ↓
SKILL ORCHESTRATOR
 ↓
MCP / API LAYER
 ↓
┌───────────────┬───────────────┬───────────────┐
│               │               │
Freshworks   Knowledge       External
│
Customer
Tickets
Knowledge
 ↓
Governance
 ↓
Human Approval
 ↓
Action
 ↓
Execution Trace


Every major node should be clickable.

Clicking "Freshworks" should explain:

Existing enterprise capabilities that the agent can access through supported integrations.

Clicking "MCP" should explain:

Standardized interface through which compatible AI applications can interact with exposed tools and resources.

Clicking "Skills" should explain:

Reusable capabilities that can be discovered and composed by agents.

Clicking "Governance" should explain:

Policies controlling which capabilities agents may execute and which actions require human approval.

40. DEMO MODE

This is extremely important because the website will be used for a screen-recorded hackathon submission.

Add a button in the top navigation:

Launch Demo

When clicked, enter a polished demo mode.

Demo mode should automatically navigate through the core scenario.

Sequence:

Open Agent Playground

Populate the ABC Corporation task

Run Agent

Show Understanding Request

Show Skill Discovery

Show Skill Composition

Show MCP Execution

Show simulated Freshworks calls

Show Knowledge Retrieval

Show Similar Incident Analysis

Show Recommendation

Stop at Human Approval

Allow manual click on Approve

Complete Update Ticket

Show final result

Show Execution Trace

The animations should be smooth enough to record.

Do not make them too fast.

The user must have enough time to explain what is happening.

41. DEMO RESET

Add:

Reset Demo

This should restore the scenario to its initial state.

Also provide:

Replay Demo

This should restart the sequence.

42. MICRO-INTERACTIONS

Use polished animations for:

Skill discovery

Workflow node activation

MCP data transfer

Status changes

Tool execution

Approval request

Successful completion

Navigation

Modal opening

Drawer opening

Keep animations professional and fast.

Do not over-animate.

43. MOCK DATA ARCHITECTURE

Keep mock data in organized TypeScript files/services.

Create data structures for:

Agents

id
name
description
status
skills
permissions
executionCount


Skills

id
name
description
category
source
permission
inputs
outputs
usage
approvalRequired


MCP Tools

id
name
description
server
source
permission
status
schema


Knowledge Sources

id
name
type
documents
status


Executions

id
agent
task
skills
tools
status
duration
timeline
approval
result


Customers

id
name
status
accountType


Tickets

id
customer
subject
priority
status
description


44. SIMULATED SERVICE LAYER

Create mock service functions such as:

lookupCustomer()
searchTickets()
searchKnowledge()
compareIncidents()
recommendResolution()
updateTicket()
requestApproval()


These should return realistic data and simulated delays.

The UI should consume these services rather than hardcoding all responses directly inside components.

This makes it clear that the architecture could later replace these mock functions with real APIs/MCP integrations.

45. FRESHWORKS SIMULATION

Create a dedicated mock Freshworks service.

For example:

FreshworksService

lookupCustomer()
searchTickets()
updateTicket()


When these functions execute, the interface should show:

SkillMesh
   ↓
MCP / API
   ↓
Freshworks
   ↓
Response


Use realistic simulated responses.

Never call this a live integration.

Display:

SIMULATED

or

PROTOTYPE ENVIRONMENT

where appropriate.

46. DO NOT MAKE IT LOOK LIKE A FAKE MARKETING WEBSITE

The website must be an actual application prototype.

The primary screen should be a functioning dashboard/application.

Do NOT make the first screen:

"Welcome to SkillMesh — The future of AI..."

with a giant marketing hero and meaningless buttons.

This is an application, not a landing page.

The dashboard should immediately expose:

Agent activity

Skills

MCP tools

Knowledge

Integrations

Executions

Governance

47. DO NOT BUILD A FRESHWORKS CLONE

Do not make the navigation primarily:

Tickets

Customers

Contacts

Inbox

Reports

That would make the product look like a Freshdesk competitor.

Instead the navigation should emphasize:

Agents

Skills

MCP Tools

Knowledge

Executions

Governance

Analytics

Freshworks should appear as an integrated enterprise capability source, not as the product being rebuilt.

48. DO NOT BUILD A GENERIC CHATBOT

The Agent Playground should have a natural-language task input, but the product must be much more than a chat interface.

The important visual elements are:

Agent reasoning/task understanding

↓

Skill discovery

↓

Skill composition

↓

MCP execution

↓

Enterprise systems

↓

Governance

↓

Action

↓

Audit

The workflow is the product.

49. INFORMATION HIERARCHY

The judge should understand these concepts in this order:

1.

There is a complex enterprise task.

2.

Existing enterprise platforms already contain useful capabilities.

3.

An agent needs multiple capabilities to solve complex tasks.

4.

Our platform lets the agent discover reusable skills.

5.

The skills are composed into a workflow.

6.

MCP/integrations connect the capabilities.

7.

Knowledge helps the agent reason.

8.

Governance controls sensitive actions.

9.

Human approval can be required.

10.

Everything is observable through execution traces.

This sequence should be reflected in the UI.

50. SCREEN-RECORDING OPTIMIZATION

The application is specifically being built to support a hackathon selection video.

Therefore:

Important elements should fit on a laptop screen.

Avoid excessive scrolling during the main demo.

Use strong visual hierarchy.

Keep important data above the fold.

Make the Agent Playground visually impressive.

Make workflow transitions obvious.

Make MCP calls readable.

Make Freshworks integration visually obvious.

Make the approval moment visually significant.

Make the final execution trace easy to understand.

The main demo should be recordable at approximately 1920×1080.

51. DEMO STORYBOARD

The finished prototype must support this exact narrative.

INTRO

Show the Dashboard.

Explain:

"Freshworks already provides enterprise systems such as customer support, tickets, knowledge and developer capabilities. Our project doesn't replace those systems."

Then move to:

AGENT PLAYGROUND

Say:

"The problem we're exploring is how an agent can dynamically discover and compose the capabilities it needs to complete a complex task."

Enter:

Investigate why ABC Corporation's production synchronization stopped and recommend the next action.

Click:

Run Agent

SKILL DISCOVERY

Show:

Customer Lookup

Ticket Search

Knowledge Search

Similar Incident Detection

Resolution Recommendation

Update Ticket

Explain:

"Instead of hard-coding all these capabilities into one agent, SkillMesh exposes them as reusable skills."

COMPOSITION

Show:

Customer Lookup
↓
Ticket Search
↓
Knowledge Search
↓
Incident Analysis
↓
Recommendation
↓
Update Ticket


Explain:

"The agent composes the capabilities required for this specific task."

MCP

Show:

Agent
↓
Skill Orchestrator
↓
MCP
↓
Freshworks


Explain:

"MCP provides the standardized interface through which compatible tools can be accessed."

FRESHWORKS

Show:

Customer information

Ticket

Historical tickets

Explain:

"Here our prototype demonstrates the intended interaction with existing Freshworks capabilities."

Do not claim this is live unless it actually is.

KNOWLEDGE

Show relevant documentation.

Explain:

"The agent combines enterprise knowledge with operational data."

INCIDENT INTELLIGENCE

Show similar incidents.

Explain:

"It identifies a repeated failure pattern and generates a recommendation."

GOVERNANCE

Stop at:

Update Ticket

Show:

Action Requires Approval

Explain:

"A read operation can be automatic, but a write operation can require human approval."

Click:

Approve & Continue

COMPLETION

Show:

✓ Ticket updated

✓ Diagnosis added

✓ Assigned to Platform Support

Then show:

Execution Trace

Explain:

"Every step is observable and auditable."

52. FINAL PRODUCT MESSAGE

The final screen should say:

Give AI agents capabilities, not just conversations.

Then:

Freshworks provides the enterprise capabilities. SkillMesh provides the agent-oriented layer for discovering, composing, governing and observing those capabilities.

Then visually:

Freshworks
     +
Knowledge
     +
External Systems
     ↓
Reusable Skills
     ↓
MCP / Integrations
     ↓
Agent Orchestration
     ↓
Governed Execution
     ↓
Observable Agents


53. UX QUALITY REQUIREMENTS

The product must feel coherent.

Every page must use:

Same typography

Same sidebar

Same cards

Same status system

Same spacing

Same icon language

Same terminology

Do not generate disconnected pages that look like different templates.

The whole application should feel like one real product.

54. ACCESSIBILITY AND USABILITY

Use:

Good contrast

Clear labels

Tooltips

Keyboard-friendly controls where practical

Meaningful status labels

Clear error/success states

Do not rely only on color to communicate state.

55. ERROR STATES

Implement realistic states for:

MCP tool unavailable

Permission denied

Approval rejected

Skill unavailable

Knowledge source unavailable

Example:

MCP tool unavailable

ticket.search could not be reached.

Suggested fallback:
Use cached ticket information.

[Retry]


This adds credibility.

56. LOADING STATES

Use skeletons/spinners where appropriate.

During agent execution, use the execution timeline instead of generic loading.

The user should understand WHAT the agent is doing rather than seeing:

"Loading..."

57. RESPONSIVE BEHAVIOR

Primary target:

Desktop.

The video will be recorded on a desktop/laptop.

Still make the UI reasonably responsive.

58. CODE QUALITY

Use:

Reusable components

Strong TypeScript types

Clean naming

Separation of mock data and UI

Separation of services and components

No giant monolithic component

No unnecessary dependencies

No broken links/buttons

No dead navigation items

Every visible major button should perform an action.

59. WHAT THE JUDGE SHOULD UNDERSTAND

After watching the prototype, the judge should be able to answer:

What is this?

An agent capability orchestration platform.

Why does it exist?

Complex agents need multiple reusable capabilities and enterprise systems to complete tasks.

What is Freshworks' role?

Freshworks represents an existing enterprise platform whose capabilities can be accessed/extended.

What is MCP's role?

A standardized interface for connecting agents/applications with exposed capabilities.

What is a Skill?

A reusable capability that an agent can discover and use.

What is the differentiator?

The proposed layer focuses on capability discovery, composition, governance and observability rather than simply providing another chatbot.

Is this replacing Freshworks?

No.

What does the demo prove?

That an agent can conceptually discover capabilities, compose them, access enterprise systems, use knowledge, obtain approval and execute a governed workflow.

60. FINAL BUILD INSTRUCTION

Now build the complete prototype.

Do NOT return a plan.

Do NOT create only a landing page.

Do NOT create static screenshots.

Do NOT create placeholder pages with "Coming Soon."

Build the actual interactive frontend application.

Prioritize the following screens in implementation quality:

Agent Playground

Dashboard

Skill Registry

MCP Tool Registry

Knowledge Hub

Execution Trace

Governance

Analytics

Agents

Architecture / Why SkillMesh

The Agent Playground must receive the highest level of polish because it is the centerpiece of the selection video.

The ABC Corporation investigation workflow must actually work using simulated data.

The workflow must visibly progress through:

REQUEST
↓
UNDERSTAND
↓
DISCOVER SKILLS
↓
COMPOSE SKILLS
↓
MCP EXECUTION
↓
FRESHWORKS SIMULATION
↓
KNOWLEDGE RETRIEVAL
↓
INCIDENT ANALYSIS
↓
RECOMMENDATION
↓
APPROVAL
↓
ACTION
↓
EXECUTION TRACE
↓
COMPLETED


Make the prototype visually impressive, technically coherent, honest about simulated integrations, and immediately understandable to a hackathon judge.

The finished application should look like a credible early-stage enterprise AI platform that could later evolve from prototype into a real product.

END OF MASTER PROMPT

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/de51c783-5ca2-44f6-a816-4cdfc1e7a205).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
