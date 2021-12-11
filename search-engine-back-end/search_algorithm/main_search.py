# import IndexingWithWhoosh.MyIndexReader as MyIndexReader
import Search.QueryRetreivalModel as QueryRetreivalModel
import Search.ExtractQuery as ExtractQuery
import datetime
import Indexing.MyIndexReader as MyIndexReader
import collections
import sys

# startTime = datetime.datetime.now()


categories = ['CMPINF', 'CS', 'INFSCI', 'ISSP', 'LIS', 'TELCOM']
course_list = collections.defaultdict(str)

# for c in categories:
#     file = open(c, 'r')
#     for line in file.readlines():
#         l = line.strip().split(':')
#         if l[2]:
#             course_list[l[0]] = l[2]
#         else:
#             course_list[l[0]] = 'NA'

#     file.close()

index = MyIndexReader.MyIndexReader()
search = QueryRetreivalModel.QueryRetrievalModel(index)


def main(argv):
    s = argv[1].strip().lower()
    extractor = ExtractQuery.ExtractQuery(s)
    queries = extractor.getQuries()

    for query in queries:
        results = search.retrieveQuery(query, 10)
        for r in results:
            print(r.getDocNo())
            
    

    

if __name__ == "__main__":
   main(sys.argv)

# print("--------- Welcome to Our Course Search System ----------- \n")
# s = input("Please type in any keywords you want to search or quit() to quit: ").strip().lower()
# while s != "quit()":
#     print("The query you just type in: {}".format(s))
#     extractor = ExtractQuery.ExtractQuery(s)

#     queries= extractor.getQuries()
#     for query in queries:
#         ##print(query.topicId,"\t",query.queryContent)
#         results = search.retrieveQuery(query, 10)
#         rank = 1
#         for result in results:
#             docNo = result.getDocNo()
#             print('Rank {}: '.format(rank), docNo)
#             print('Description: ', course_list["".join(docNo.split(' ')[:2])], '\n')
#             rank = rank +1
    
#     s = input("Type a new query for another search or quit() to quit: ").lower()

# print("Goodbye!")

# endTime = datetime.datetime.now()
# print ("load index & retrieve the token running time: ", endTime - startTime)
