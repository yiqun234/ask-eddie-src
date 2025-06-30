"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Edit,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Loader2,
  Calendar as CalendarIcon,
} from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Student, Application } from "@/app/api/rec-tracker/route";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type SortableKey = keyof Omit<Student, "id" | "applications" | "status">;
type SubSortableKey = keyof Omit<Application, "id" | "recRequired" | "program" | "collegeName" | "status">;

const EditRecForm = ({ student, onSuccess, onCancel }: { student: Student; onSuccess: () => void; onCancel: () => void; }) => {
  const [name, setName] = React.useState(student.name);
  const [deadline, setDeadline] = React.useState<Date | undefined>(
    student.earliestDeadline ? new Date(student.earliestDeadline) : undefined
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deadline) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/rec-tracker/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, earliestDeadline: deadline.toISOString() }),
      });
      if (response.ok) {
        onSuccess();
      } else {
        console.error("Failed to update recommendation");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Edit Rec</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Student Name</Label>
          <Input id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="deadline" className="text-right">Earliest Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "col-span-3 justify-start text-left font-normal",
                  !deadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting || !name || !deadline}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const NewRecForm = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void; }) => {
  const [name, setName] = React.useState('');
  const [deadline, setDeadline] = React.useState<Date>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deadline) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rec-tracker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, earliestDeadline: deadline.toISOString() }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        console.error("Failed to create new recommendation");
        // Optionally: show an error message to the user
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">New Rec - Start from Scratch</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Student Name
          </Label>
          <Input id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="deadline" className="text-right">
            Earliest Deadline
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "col-span-3 justify-start text-left font-normal",
                  !deadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting || !name || !deadline}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </div>
    </form>
  );
};

export default function RecTrackerPage() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
  const [sortConfig, setSortConfig] = React.useState<{ key: SortableKey; direction: "asc" | "desc" } | null>(null);
  const [subSortConfig, setSubSortConfig] = React.useState<{ key: SubSortableKey; direction: "asc" | "desc"} | null>(null);
  const [dialogState, setDialogState] = React.useState<{
    view: 'closed' | 'initial' | 'new_form' | 'edit_form' | 'view_details';
    student?: Student;
  }>({ view: 'closed' });

  const fetchData = React.useCallback(async () => {
    try {
      const response = await fetch('/api/rec-tracker');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  }, []);

  React.useEffect(() => {
    const initialFetch = async () => {
        setIsLoading(true);
        await fetchData();
        setIsLoading(false);
    }
    initialFetch();
  }, [fetchData]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  const getDaysLeftColor = (days: number | null) => {
    if (days === null) return "text-slate-500";
    if (days <= 3) return "text-red-500 font-bold";
    if (days <= 15) return "text-yellow-500 font-bold";
    return "text-green-500 font-bold";
  };

  const requestSort = (key: SortableKey) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  
  const requestSubSort = (key: SubSortableKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (subSortConfig && subSortConfig.key === key && subSortConfig.direction === 'asc') {
        direction = 'desc';
    }
    setSubSortConfig({ key, direction });
  };

  const sortedStudents = React.useMemo(() => {
    const sortableItems = [...students];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal === null) return 1;
        if (bVal === null) return -1;
        
        if (sortConfig.key === 'earliestDeadline') {
            const dateA = new Date(aVal as string).getTime();
            const dateB = new Date(bVal as string).getTime();
            if (dateA < dateB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (dateA > dateB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [students, sortConfig]);

  const getSortIcon = (key: SortableKey) => {
    if (!sortConfig || sortConfig.key !== key) return <span className="w-4 h-4" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const getSubSortIcon = (key: SubSortableKey) => {
    if (!subSortConfig || subSortConfig.key !== key) return <span className="w-4 h-4" />;
    return subSortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const handleDialogSuccess = () => {
    fetchData();
    setDialogState({ view: 'closed' });
  }

  const handleOpenNewDialog = () => setDialogState({ view: 'initial' });
  const handleOpenEditDialog = (student: Student) => setDialogState({ view: 'edit_form', student });
  const handleOpenViewDialog = (student: Student) => setDialogState({ view: 'view_details', student });

  return (
    <div className="bg-white rounded-lg shadow w-full h-full flex flex-col">
      <div className="p-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">RecTracker</h1>
        <Dialog open={dialogState.view !== 'closed'} onOpenChange={(open) => {
          if (!open) {
            setDialogState({ view: 'closed' });
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNewDialog}>New Rec</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            {dialogState.view === 'initial' && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">New Rec</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <button onClick={() => setDialogState({ view: 'new_form' })} className="flex items-center justify-between w-full p-4 border rounded-lg hover:bg-slate-50">
                    <span>Start from scratch</span>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between w-full p-4 border rounded-lg hover:bg-slate-50">
                    <span>Get help from AI assistant</span>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
              </>
            )}
            {dialogState.view === 'new_form' && (
              <NewRecForm 
                onSuccess={handleDialogSuccess} 
                onCancel={() => setDialogState({ view: 'initial' })}
              />
            )}
            {dialogState.view === 'edit_form' && dialogState.student && (
              <EditRecForm 
                student={dialogState.student}
                onSuccess={handleDialogSuccess} 
                onCancel={() => setDialogState({ view: 'closed' })}
              />
            )}
             {dialogState.view === 'view_details' && dialogState.student && (
                <>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{dialogState.student.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 text-sm">
                        <p><strong># of Colleges:</strong> {dialogState.student.colleges}</p>
                        <p><strong>Earliest Deadline:</strong> {new Date(dialogState.student.earliestDeadline).toLocaleDateString()}</p>
                        <p><strong>Days Left:</strong> {dialogState.student.daysLeft ?? '-'}</p>
                        <p><strong>Letter Status:</strong> {dialogState.student.status}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => setDialogState({ view: 'closed' })}>Close</Button>
                    </div>
                </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 px-8 pb-8 overflow-y-auto">
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E2E7EF] hover:bg-[#E2E7EF] border-b-0 h-[80px]">
                  <TableHead className="w-[50px] px-3"></TableHead>
                  <TableHead className="px-3">
                    <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold text-slate-700" onClick={() => requestSort('name')}>
                      Name {getSortIcon('name')}
                    </Button>
                  </TableHead>
                  <TableHead className="px-3">
                    <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold text-slate-700" onClick={() => requestSort('colleges')}>
                      # of Colleges {getSortIcon('colleges')}
                    </Button>
                  </TableHead>
                  <TableHead className="px-3">
                    <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold text-slate-700" onClick={() => requestSort('earliestDeadline')}>
                      Earliest Deadline {getSortIcon('earliestDeadline')}
                    </Button>
                  </TableHead>
                  <TableHead className="px-3">
                    <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold text-slate-700" onClick={() => requestSort('daysLeft')}>
                      Days Left {getSortIcon('daysLeft')}
                    </Button>
                  </TableHead>
                  <TableHead className="px-3 font-semibold text-slate-700">Letter Status</TableHead>
                  <TableHead className="px-3 font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                        <span className="text-lg">Loading students...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedStudents.map((student) => (
                    <React.Fragment key={student.id}>
                      <TableRow className="border-b h-[63px]">
                        <TableCell className="px-3">
                          <Button variant="ghost" size="icon" onClick={() => toggleRow(student.id)}>
                            {expandedRows[student.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium px-3">{student.name}</TableCell>
                        <TableCell className="px-3">{student.colleges}</TableCell>
                        <TableCell className="px-3">
                          {new Date(student.earliestDeadline).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className={`${getDaysLeftColor(student.daysLeft)} px-3`}>
                          {student.daysLeft ?? "-"}
                        </TableCell>
                        <TableCell className="px-3">{student.status}</TableCell>
                        <TableCell className="px-3">
                          <Button variant="ghost" size="icon" onClick={() => student.status === 'Finalized' ? handleOpenViewDialog(student) : handleOpenEditDialog(student)}>
                            {student.status === "Finalized" ? <Eye size={16} /> : <Edit size={16} />}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedRows[student.id] && (
                        <TableRow className="bg-[#F1F4F9] hover:bg-[#F1F4F9]">
                          <TableCell colSpan={7} className="p-0">
                            {student.applications.length > 0 ? (
                              (() => {
                                const sortedDetails = [...student.applications].sort((a, b) => {
                                  if (!subSortConfig) return 0;
                                  
                                  const aVal = a[subSortConfig.key];
                                  const bVal = b[subSortConfig.key];

                                  if (subSortConfig.key === 'deadline') {
                                      const dateA = new Date(aVal as string).getTime();
                                      const dateB = new Date(bVal as string).getTime();
                                      if (dateA < dateB) return subSortConfig.direction === 'asc' ? -1 : 1;
                                      if (dateA > dateB) return subSortConfig.direction === 'asc' ? 1 : -1;
                                      return 0;
                                  }

                                  if (aVal === null) return 1;
                                  if (bVal === null) return -1;
                                  if (aVal < bVal) return subSortConfig.direction === 'asc' ? -1 : 1;
                                  if (aVal > bVal) return subSortConfig.direction === 'asc' ? 1 : -1;
                                  return 0;
                                });

                                return (
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-transparent hover:bg-transparent border-b-0 h-10">
                                        <TableHead className="font-semibold text-slate-700 pl-16">College</TableHead>
                                        <TableHead className="font-semibold text-slate-700">App Type</TableHead>
                                        <TableHead>
                                          <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold text-slate-700" onClick={() => requestSubSort('deadline')}>
                                            Deadline {getSubSortIcon('deadline')}
                                          </Button>
                                        </TableHead>
                                        <TableHead>
                                          <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold text-slate-700" onClick={() => requestSubSort('daysLeft')}>
                                            Days Left {getSubSortIcon('daysLeft')}
                                          </Button>
                                        </TableHead>
                                        <TableHead className="font-semibold text-slate-700">Rec. Required</TableHead>
                                        <TableHead className="font-semibold text-slate-700">Rec. Status</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {sortedDetails.map((detail) => (
                                        <TableRow key={detail.id} className="bg-transparent hover:bg-transparent border-b-0 h-10">
                                          <TableCell className="pl-16">{detail.collegeName}</TableCell>
                                          <TableCell>{detail.program}</TableCell>
                                          <TableCell>
                                            {new Date(detail.deadline).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric",
                                            })}
                                          </TableCell>
                                          <TableCell className={`${getDaysLeftColor(detail.daysLeft)}`}>
                                            {detail.daysLeft}
                                          </TableCell>
                                          <TableCell>
                                            {detail.recRequired ? (
                                              <CheckCircle2 size={16} className="text-green-500" />
                                            ) : (
                                              "-"
                                            )}
                                          </TableCell>
                                          <TableCell>{detail.status}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                );
                              })()
                            ) : (
                              <div className="text-center py-4 text-slate-500">
                                No college applications for this student yet.
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
} 