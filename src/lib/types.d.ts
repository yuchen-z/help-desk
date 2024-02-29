export type Ticket = {
  id: number
  name: string
  email: string
  description: string,
  date: Date,
  status: "OPEN" | "IN_PROGRESS" | "CLOSE"
}

interface ResponseFormProps {
  row: Row<Ticket>,
  onSubmitResponse: (data) => void,
  onClickCloseTicket: () => void,
  onClickClose: () => void,
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  onClickRow: Function,
}

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}