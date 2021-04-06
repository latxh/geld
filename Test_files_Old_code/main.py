import tabula
import csv
import os
from os import listdir
from PyPDF2 import PdfFileMerger, PdfFileReader


def get_filenames():
    cwd = os.getcwd()
    names = []
    for file in listdir(cwd):
        if 'pdf' in file:
            names.append(file)

    return names


def parsePDF():
    files = get_filenames()
    merger = PdfFileMerger()

    for pdf in files:
        print(pdf)
        read_pdf = PdfFileReader(pdf)
        num_pages = read_pdf.getNumPages()
        # print(num_pages)
        merger.append(pdf, pages=(2, num_pages-1))

    merger.write("result.pdf")
    merger.close()

    # print('REACHED')

    tabula.convert_into('result.pdf', 'input.csv',
                        pages='all', output_format='csv')

    in_csvfile = open('input.csv')
    out_csvfile = open('Transactions.csv', 'x')

    #count = 0

    reader = csv.reader(in_csvfile)
    writer = csv.writer(out_csvfile, lineterminator='\n')

    for row in reader:
        check = row[0].replace("/", "")
        if check.isdigit() and row[3] != '':
            writer.writerow(row)
            # print(row)
            #count += 1

    # print(count)

    in_csvfile.close()
    out_csvfile.close()

    deleteTemps(['input.csv', 'result.pdf'])


def deleteTemps(list_names):
    file_names = list_names

    for file in file_names:
        os.remove(file)


def readCategories():
    file = 'categories.csv'

    categories = {}

    with open(file, encoding='utf-8-sig') as csv_file:
        reader = csv.reader(csv_file)

        for row in reader:
            categories[row[0]] = list(filter(None, row[1:]))

    return categories


def sortTransactions(categories):
    file = 'Transactions.csv'

    with open(file) as csv_file:
        reader = csv.reader(csv_file)

        sortedExpenses = {}
        found = False

        not_done = []

        for key in categories:
            sortedExpenses[key] = []

        for row in reader:
            not_done.append(row)
            expenseName = row[2]
            for key, items in categories.items():
                for item in items:
                    if item in expenseName:
                        sortedExpenses[key].append(row[4])
                        found = True
                        not_done.remove(row)
                        break
                if found:
                    found = False
                    break
            # print(key)

        # for key, items in sortedExpenses.items():
         #   print(key, ":", items)

    for exp in not_done:
        print(exp)

    print(len(not_done))
    note_undone(not_done)

    return sortedExpenses


def note_undone(trans):
    file = 'Missing.csv'

    with open(file, 'x') as csv_file:
        writer = csv.writer(csv_file)

        for exp in trans:
            writer.writerow(exp)


def dict_to_csv(dict):
    file = 'SortedExpenses.csv'

    with open(file, 'x') as csv_file:
        writer = csv.writer(csv_file, lineterminator='\n')
        writer.writerow(['', 'TOTAL', ''])

        for key, items in dict.items():
            #print(key, ":", items)
            try:
                writer.writerow([key] + items)
            except:
                print(key, ":", items, " had a problem writing")


def sum_expense(expenses):
    for key, items in expenses.items():
        item = []
        subtract = []
        for exp in items:
            exp = exp.replace(',', '')
            if exp[-1] == '-':
                subtract.append(float(exp[1:-1]))
            else:
                item.append(float(exp[1:]))
        negSum = sum(subtract)
        Sum = sum(item)
        total = "$" + str(Sum-negSum)
        items.insert(0, total)
        expenses[key] = items

    return expenses


def main():
    tempFiles = ['Transactions.csv', 'input.csv',
                 'result.pdf', 'SortedExpenses.csv', 'Missing.csv']

    for file in tempFiles:
        try:
            deleteTemps([file])
        except:
            print("Deleting ", file, " : File was not found")

    parsePDF()
    categories = readCategories()
    sortedExpenses = sortTransactions(categories)
    sortedExpenses = sum_expense(sortedExpenses)
    dict_to_csv(sortedExpenses)

    tempFiles = ['Transactions.csv', 'input.csv',
                 'result.pdf']

    for file in tempFiles:
        try:
            deleteTemps([file])
        except:
            print("Deleting ", file, " : File was not found")


if __name__ == "__main__":
    main()
