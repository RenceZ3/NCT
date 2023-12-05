import { TestBed } from '@angular/core/testing';

import { DocumentCassandraService } from './document-cassandra.service';

describe('DocumentCassandraService', () => {
  let service: DocumentCassandraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentCassandraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
