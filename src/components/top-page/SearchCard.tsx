import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const SearchCard = () => {
  return (
    <Card className="w-full p-2">
      <CardHeader>
        <CardTitle>NDEx Search</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full max-w-6xl items-center space-x-2">
        <Input type="search" placeholder="NDEx search term..." />
        <Button type="submit" variant={'outline'}>
          Search
        </Button>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
