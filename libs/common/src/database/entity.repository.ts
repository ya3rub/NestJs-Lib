
// export abstract class EntityRepository<TSchema extends Document> {
//   constructor(protected readonly entityModel: Model<TSchema>) {}
  
//   async findOne(
//     entityFilterQuery: FilterQuery<TSchema>,
//     projection?: Record<string, unknown>,
//   ) : Promise<TSchema>{
//     return this.entityModel
//       .findOne(entityFilterQuery, {
//         _id: 0,
//         __v: 0,
//         ...projection,
//       })
//       .exec();
//   }
// }
