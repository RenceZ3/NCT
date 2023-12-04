import { TestBed } from '@angular/core/testing';

import { CassandraDatastaxService } from './cassandra-datastax.service';

describe('CassandraDatastaxService', () => {
  let service: CassandraDatastaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CassandraDatastaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
